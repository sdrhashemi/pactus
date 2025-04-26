package wallet

import (
	"context"
	"database/sql"

	"github.com/pactus-project/pactus/wallet/vault"

	"encoding/json"

	"github.com/pactus-project/pactus/util"
)

type StoreDriver interface {
	Load(ctx context.Context) (*Store, error)

	Save(ctx context.Context, store *Store) error

	Close() error
}
type Reader interface {
	IsEncrypted(ctx context.Context) bool
	GetAddressInfo(ctx context.Context, addr string) (*vault.AddressInfo, error)
	GetVault(ctx context.Context) (*vault.Vault, error)
	GetVersion(ctx context.Context) (int, error)
}

type Writer interface {
	SaveVault(ctx context.Context, vault *vault.Vault) error
	SaveAddressInfo(ctx context.Context, addr string, info *vault.AddressInfo) error
	UpdateVersion(ctx context.Context, version int) error
}

type Driver interface {
	Reader
	Writer
	CreateValidator(ctx context.Context, label string) error
	CreateBlsAccount(ctx context.Context, label string) error
	Close() error
}

type JSONDriver struct {
	filePath string
}
type SQLiteDriver struct {
	db *sql.DB
}

func NewJSONDriver(filePath string) StoreDriver {
	return &JSONDriver{
		filePath: filePath,
	}
}

func (d *JSONDriver) Load(ctx context.Context) (*Store, error) {
	data, err := util.ReadFile(d.filePath)
	if err != nil {
		return nil, err
	}

	store, err := fromBytes(data)
	if err != nil {
		return nil, err
	}
	if err := store.ValidateCRC(); err != nil {
		return nil, err
	}
	return store, nil
}

func (d *JSONDriver) Save(ctx context.Context, store *Store) error {
	data, err := store.ToBytes()
	if err != nil {
		return err
	}

	if err := util.WriteFile(d.filePath, data); err != nil {
		return err
	}
	return nil
}
func (d *JSONDriver) Close() error {
	return nil
}

func fromBytes(data []byte) (*Store, error) {
	s := new(Store)
	if err := json.Unmarshal(data, s); err != nil {
		return nil, err
	}

	return s, nil
}

func NewSQLiteDriver(db *sql.DB) StoreDriver {
	return &SQLiteDriver{
		db: db,
	}
}

func (d *SQLiteDriver) Load(ctx context.Context) (*Store, error) {
	row := d.db.QueryRowContext(ctx,
		`SELECT version, uuid, created_at, network, vault_crc, vault_data, history
	FROM wallet_store LIMIT 1`)

	store := new(Store)
	var vaultData, historyData []byte

	err := row.Scan(&store.Version, &store.UUID, &store.CreatedAt, &store.Network,
		&store.VaultCRC, &vaultData, &historyData)
	if err != nil {
		return nil, err
	}

	store.Vault = new(vault.Vault)
	if err := json.Unmarshal(vaultData, store.Vault); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(historyData, &store.History); err != nil {
		return nil, err
	}
	return store, nil
}

func (d *SQLiteDriver) Save(ctx context.Context, store *Store) error {
	vaultData, err := json.Marshal(store.Vault)
	if err != nil {
		return err
	}

	historyData, err := json.Marshal(store.History)
	if err != nil {
		return err
	}

	_, err = d.db.ExecContext(ctx,
		`INSERT OR REPLACE INTO wallet_store (version, uuid, created_at, network, vault_crc, vault_data, history)
		VALUES (?, ?, ?, ?, ?, ?, ?)`,
		store.Version, store.UUID, store.CreatedAt, store.Network,
		store.VaultCRC, vaultData, historyData)

	return err
}

func (d *SQLiteDriver) Close() error {
	if d.db != nil {
		return d.db.Close()
	}
	return nil
}
