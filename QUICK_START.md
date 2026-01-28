# Quick Start Guide - Recipe Management

## 🎯 What's Been Set Up

Your project now has complete Supabase integration for recipe management with:

### Database Tables
- ✅ **recipe** - Main recipe information
- ✅ **recipe_ingredient** - Recipe ingredients with quantities
- ✅ **food_label** - Recipe images and nutrition labels
- ✅ **nutrition** - Nutritional information per recipe

### File Storage
- ✅ Supabase client configured for image uploads
- ✅ Helper functions for file management

### Configuration Files
- ✅ Environment variables configured
- ✅ Drizzle ORM schema updated
- ✅ Migration files generated

---

## 📝 Next Steps

### 1. Install Dependencies (if not done)
```bash
npm install
```

### 2. Set Up Your Supabase Account
Follow the detailed guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

Key steps:
1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your credentials from Settings → API
4. Create storage buckets for images

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Copy from .env.example and fill in your Supabase credentials
DATABASE_URL=postgresql://postgres.[ref]:[password]@...
NEXT_PUBLIC_SUPABASE_URL=https://[ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 4. Run Database Migration

```bash
npm run db:migrate
```

This creates all the recipe tables in your Supabase database.

### 5. Start Development Server

```bash
npm run dev
```

---

## 🔧 How to Use the Recipe System

### Example: Create a Recipe Form Component

```tsx
'use client';

import { useState } from 'react';
import { createCompleteRecipe } from '@/examples/RecipeExamples';

export function CreateRecipeForm({ userId }: { userId: string }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<Array<{
    name: string;
    quantity: string;
    unit: string;
  }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const recipe = await createCompleteRecipe(userId, {
        name,
        description,
        ingredients,
        servings: 4,
        prepTime: 15,
        cookTime: 30,
        difficulty: 'easy',
      });
      
      console.log('Recipe created:', recipe);
      alert('Recipe created successfully!');
    } catch (error) {
      console.error('Failed to create recipe:', error);
      alert('Failed to create recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Recipe Name"
        required
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      
      {/* Add more fields for ingredients, images, etc. */}
      
      <button type="submit">Create Recipe</button>
    </form>
  );
}
```

### Example: Upload Recipe Image

```tsx
'use client';

import { uploadRecipeImage } from '@/examples/RecipeExamples';

export function ImageUploader({ 
  userId, 
  recipeId 
}: { 
  userId: string; 
  recipeId: number;
}) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadRecipeImage(
        userId,
        recipeId,
        file,
        'food_image'
      );
      console.log('Image uploaded:', result);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
```

---

## 📊 Database Schema Overview

### Recipe Table
```typescript
{
  id: number;              // Auto-generated
  userId: string;          // User who created the recipe
  name: string;            // Recipe name
  description?: string;    // Recipe description
  servings?: number;       // Number of servings
  prepTime?: number;       // Preparation time (minutes)
  cookTime?: number;       // Cooking time (minutes)
  instructions?: string;   // Cooking instructions
  category?: string;       // e.g., 'breakfast', 'lunch', 'dinner'
  cuisine?: string;        // e.g., 'italian', 'mexican'
  difficulty?: string;     // e.g., 'easy', 'medium', 'hard'
  isPublic: string;        // 'true' or 'false'
  createdAt: Date;
  updatedAt: Date;
}
```

### Recipe Ingredient Table
```typescript
{
  id: number;
  recipeId: number;       // References recipe.id
  name: string;           // Ingredient name
  quantity: string;       // Amount (e.g., "2", "1.5")
  unit?: string;          // Unit (e.g., "cups", "grams")
  notes?: string;         // Optional notes
  sortOrder: number;      // Display order
  createdAt: Date;
  updatedAt: Date;
}
```

### Food Label Table (Images)
```typescript
{
  id: number;
  recipeId?: number;      // Optional reference to recipe
  userId: string;
  labelType: string;      // 'nutrition_label', 'food_image', 'step_image'
  imageUrl: string;       // Public URL from Supabase
  imagePath: string;      // Storage path
  caption?: string;       // Image caption
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Nutrition Table
```typescript
{
  id: number;
  recipeId: number;       // References recipe.id
  calories?: string;
  protein?: string;       // in grams
  carbohydrates?: string; // in grams
  fat?: string;           // in grams
  fiber?: string;         // in grams
  sugar?: string;         // in grams
  sodium?: string;        // in mg
  cholesterol?: string;   // in mg
  servingSize?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎨 Supabase Storage Buckets

You'll need to create these buckets in Supabase Dashboard:

| Bucket Name | Purpose | Public | Max Size |
|-------------|---------|--------|----------|
| `recipe-images` | General recipe photos | ✅ Yes | 5 MB |
| `nutrition-labels` | Nutrition label images | ✅ Yes | 5 MB |
| `food-labels` | All food-related images | ✅ Yes | 5 MB |

---

## 🚀 Available Functions

Check [src/examples/RecipeExamples.ts](./src/examples/RecipeExamples.ts) for:

- ✅ `createRecipe()` - Create a new recipe
- ✅ `addIngredientsToRecipe()` - Add ingredients
- ✅ `uploadRecipeImage()` - Upload images to Supabase
- ✅ `addNutritionInfo()` - Add nutrition data
- ✅ `getRecipeWithDetails()` - Get complete recipe
- ✅ `getUserRecipes()` - Get user's recipes
- ✅ `updateRecipe()` - Update recipe details
- ✅ `deleteRecipe()` - Delete recipe and images
- ✅ `searchRecipes()` - Search recipes
- ✅ `createCompleteRecipe()` - Complete recipe creation flow

---

## 📚 Useful Resources

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Detailed setup instructions
- [Recipe Examples](./src/examples/RecipeExamples.ts) - Code examples
- [Supabase Client](./src/libs/Supabase.ts) - Storage utilities
- [Database Schema](./src/models/Schema.ts) - Table definitions

---

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Generate migration after schema changes
npm run db:generate

# Run migrations (production)
npm run db:migrate

# Start development server
npm run dev

# Open Drizzle Studio (database GUI)
npm run db:studio
```

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Create `.env.local` file
- Add Supabase credentials from your dashboard

### Migration fails
- Check DATABASE_URL is correct
- Ensure Supabase project is active
- Try manual migration in Supabase SQL Editor

### Image upload fails
- Verify storage buckets exist
- Check storage policies (RLS)
- Ensure file size < 5 MB

---

## 💡 Tips

1. **Development**: Use `.env.local` for local development
2. **Production**: Set environment variables in your hosting platform
3. **Security**: Never commit `.env.local` to git (it's in .gitignore)
4. **Testing**: Use Drizzle Studio to view your data: `npm run db:studio`
5. **Images**: Always validate file types and sizes before uploading

---

Happy cooking! 👨‍🍳👩‍🍳
