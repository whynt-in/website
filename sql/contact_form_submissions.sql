CREATE TABLE contact_form_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,

    email TEXT NOT NULL,
    phone_number TEXT,

    message TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'read', 'resolved')),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_form_created_at
ON contact_form_submissions(created_at DESC);

CREATE INDEX idx_contact_form_email
ON contact_form_submissions(email);