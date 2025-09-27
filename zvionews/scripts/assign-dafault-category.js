const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Находим или создаем категорию "Без категории"
  let defaultCategory = await prisma.category.findFirst({ where: { name: 'Без категории' }});
  
  if (!defaultCategory) {
    defaultCategory = await prisma.category.create({ data: { name: 'Без категории', slug: 'uncategorized' } });
    console.log('Создана новая категория:', defaultCategory.name);
  } else {
    console.log('Категория "Без категории" уже существует.');
  }

  // Обновляем все посты, у которых нет категории
  const postsToUpdate = await prisma.post.count({
    where: { categoryId: null },
  });

  if (postsToUpdate > 0) {
    await prisma.post.updateMany({
      where: { categoryId: null },
      data: { categoryId: defaultCategory.id },
    });
    console.log(`Обновлено ${postsToUpdate} постов.`);
  } else {
    console.log('Все посты уже имеют категорию.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

#### **Выполните скрипт**

```bash
node scripts/assign-default-category.js
```
Этот скрипт создаст категорию "Без категории" и привяжет её ко всем вашим существующим постам.

---

### **Шаг 4: Обновление схемы и финальная миграция**

Теперь, когда все посты имеют категорию, вы можете сделать поле `categoryId` обязательным.

```prisma
// prisma/schema.prisma

// ...
model Post {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  title       String
  slug        String   @unique
  content     String
  imageUrl    String
  views       String
  
  author      User     @relation(fields: [authorId], references: [id])
  authorId    Int
  
  // Теперь поле обязательное
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  Int
}
// ...
```

После этого выполните финальную миграцию.

```bash
npx prisma migrate dev --name make_category_required
