/**
 * @load {food}
 */
INSERT INTO [functional].[food] 
([idAccount], [name], [calories], [protein], [carbohydrates], [fats], [servingSize], [servingUnit])
VALUES 
(1, 'Arroz Branco Cozido', 130, 2.7, 28.2, 0.3, 100, 'g'),
(1, 'Feijão Carioca Cozido', 76, 4.8, 13.6, 0.5, 100, 'g'),
(1, 'Peito de Frango Grelhado', 165, 31, 0, 3.6, 100, 'g'),
(1, 'Ovo Cozido', 155, 13, 1.1, 11, 100, 'g'),
(1, 'Banana Prata', 89, 1.1, 22.8, 0.3, 100, 'g');
GO
