DROP TABLE IF EXISTS expenses;

CREATE TABLE expenses (
    id VARCHAR(255) PRIMARY KEY,
    details VARCHAR(255) NOT NULL,
    cents INT NOT NULL
);
