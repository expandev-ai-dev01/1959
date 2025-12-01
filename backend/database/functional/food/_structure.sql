/*
  DROP TABLES INVERSE ORDER
*/
/*
DROP TABLE IF EXISTS [functional].[food];
*/

/**
 * @table {food} Database of nutritional information for foods
 * @multitenancy true
 * @softDelete true
 * @alias food
 */
CREATE TABLE [functional].[food] (
  [idFood] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [name] NVARCHAR(200) NOT NULL,
  [description] NVARCHAR(500) NOT NULL DEFAULT (''),
  [calories] NUMERIC(10, 2) NOT NULL DEFAULT (0),
  [protein] NUMERIC(10, 2) NOT NULL DEFAULT (0),
  [carbohydrates] NUMERIC(10, 2) NOT NULL DEFAULT (0),
  [fats] NUMERIC(10, 2) NOT NULL DEFAULT (0),
  [servingSize] NUMERIC(10, 2) NOT NULL DEFAULT (100),
  [servingUnit] NVARCHAR(50) NOT NULL DEFAULT ('g'),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);
GO

/**
 * @primaryKey {pkFood}
 * @keyType Object
 */
ALTER TABLE [functional].[food]
ADD CONSTRAINT [pkFood] PRIMARY KEY CLUSTERED ([idFood]);
GO

/**
 * @index {ixFood_Account_Name} Search by name within account
 * @type Search
 * @filter Active records only
 */
CREATE NONCLUSTERED INDEX [ixFood_Account_Name] 
ON [functional].[food]([idAccount], [name])
WHERE [deleted] = 0;
GO
