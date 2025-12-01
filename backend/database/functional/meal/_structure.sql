/*
  DROP TABLES INVERSE ORDER
*/
/*
DROP TABLE IF EXISTS [functional].[mealItem];
DROP TABLE IF EXISTS [functional].[mealRecord];
*/

/**
 * @table {mealRecord} Stores daily meal entries
 * @multitenancy true
 * @softDelete true
 * @alias meal
 */
CREATE TABLE [functional].[mealRecord] (
  [idMealRecord] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [date] DATE NOT NULL,
  [time] TIME NOT NULL,
  [type] NVARCHAR(50) NOT NULL,
  [notes] NVARCHAR(500) NULL,
  [photoUrl] NVARCHAR(MAX) NULL,
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);
GO

/**
 * @primaryKey {pkMealRecord}
 * @keyType Object
 */
ALTER TABLE [functional].[mealRecord]
ADD CONSTRAINT [pkMealRecord] PRIMARY KEY CLUSTERED ([idMealRecord]);
GO

/**
 * @check {chkMealRecord_Type} Valid meal types
 * @enum {Café da Manhã} Breakfast
 * @enum {Almoço} Lunch
 * @enum {Jantar} Dinner
 * @enum {Lanche} Snack
 */
ALTER TABLE [functional].[mealRecord]
ADD CONSTRAINT [chkMealRecord_Type] CHECK ([type] IN ('Café da Manhã', 'Almoço', 'Jantar', 'Lanche'));
GO

/**
 * @index {ixMealRecord_Account_Date} Filter by date within account
 * @type Search
 * @filter Active records only
 */
CREATE NONCLUSTERED INDEX [ixMealRecord_Account_Date] 
ON [functional].[mealRecord]([idAccount], [date])
INCLUDE ([time], [type])
WHERE [deleted] = 0;
GO

/**
 * @table {mealItem} Individual food items within a meal
 * @multitenancy true
 * @softDelete false
 * @alias item
 */
CREATE TABLE [functional].[mealItem] (
  [idMealItem] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [idMealRecord] INTEGER NOT NULL,
  [idFood] INTEGER NULL,
  [manualFoodName] NVARCHAR(100) NULL,
  [quantity] NUMERIC(10, 2) NOT NULL,
  [unit] NVARCHAR(50) NOT NULL,
  [calories] NUMERIC(10, 2) NOT NULL,
  [protein] NUMERIC(10, 2) NOT NULL,
  [carbohydrates] NUMERIC(10, 2) NOT NULL,
  [fats] NUMERIC(10, 2) NOT NULL
);
GO

/**
 * @primaryKey {pkMealItem}
 * @keyType Object
 */
ALTER TABLE [functional].[mealItem]
ADD CONSTRAINT [pkMealItem] PRIMARY KEY CLUSTERED ([idMealItem]);
GO

/**
 * @foreignKey {fkMealItem_MealRecord} Link to parent meal
 * @target {functional.mealRecord}
 */
ALTER TABLE [functional].[mealItem]
ADD CONSTRAINT [fkMealItem_MealRecord] FOREIGN KEY ([idMealRecord])
REFERENCES [functional].[mealRecord]([idMealRecord]);
GO

/**
 * @foreignKey {fkMealItem_Food} Link to food database (optional)
 * @target {functional.food}
 */
ALTER TABLE [functional].[mealItem]
ADD CONSTRAINT [fkMealItem_Food] FOREIGN KEY ([idFood])
REFERENCES [functional].[food]([idFood]);
GO

/**
 * @index {ixMealItem_MealRecord} Retrieve items for a meal
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixMealItem_MealRecord] 
ON [functional].[mealItem]([idAccount], [idMealRecord]);
GO
