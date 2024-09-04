INSERT INTO [generator].[dbo].[Categories] ([Nom], [Description])
VALUES 
('Departement RH', 'Departement des Ressources Humaines (RH)'),
('Departement RnD', 'Departement de Recherche et Developpement (RnD)'),
('Departement IT', 'Departement Informatique (IT)'),
('Departement Financier', 'Departement Financier');

INSERT INTO [generator].[dbo].[AspNetUsers] 
(
    [Id],
    [Nom],
    [Discriminator],
    [UserName],
    [NormalizedUserName],
    [Email],
    [NormalizedEmail],
    [EmailConfirmed],
    [PasswordHash],
    [SecurityStamp],
    [ConcurrencyStamp],
    [PhoneNumber],
    [PhoneNumberConfirmed],
    [TwoFactorEnabled],
    [LockoutEnd],
    [LockoutEnabled],
    [AccessFailedCount]
)
VALUES 
(
    'c31a359a-04b0-41ab-bb23-b29c7587b1e0', -- User ID
    'asmae',                               -- Nom
    'Administrateur',                      -- Discriminator
    'mbrasmae',                            -- UserName
    NULL,                                  -- NormalizedUserName (NULL as provided)
    'mbrasmae@gmail.com',                  -- Email
    NULL,                                  -- NormalizedEmail (NULL as provided)
    0,                                     -- EmailConfirmed (0 means not confirmed)
    '/mBux/sGr/G9gZMsxkldZQ==',            -- PasswordHash
    'f9b3e995-6615-43db-af09-e18add891738', -- SecurityStamp
    '67dec0b3-6d16-40c8-b526-649ac01e3e2e', -- ConcurrencyStamp
    NULL,                                  -- PhoneNumber (NULL as provided)
    0,                                     -- PhoneNumberConfirmed (0 means not confirmed)
    0,                                     -- TwoFactorEnabled (0 means not enabled)
    NULL,                                  -- LockoutEnd (NULL as provided)
    0,                                     -- LockoutEnabled (0 means not enabled)
    0                                      -- AccessFailedCount
);

-- username : mbrasmae
-- password : Asmae123-