# Supabase Setup Guide for Recipe Management

This guide will walk you through setting up Supabase for your Food Label SaaS Boilerplate project.

## 📋 Table of Contents
1. [Creating a Supabase Account](#creating-a-supabase-account)
2. [Setting Up Your Database](#setting-up-your-database)
3. [Creating Storage Buckets](#creating-storage-buckets)
4. [Configuring Your Project](#configuring-your-project)
5. [Running Migrations](#running-migrations)
6. [Testing the Connection](#testing-the-connection)

---

## 1. Creating a Supabase Account

### Step 1: Sign Up
1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Choose your sign-up method:
   - Sign up with GitHub (recommended)
   - Sign up with email

### Step 2: Create a New Project
1. After signing in, click **"New Project"**
2. Fill in the project details:
   - **Name**: `foodlabel-recipes` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Select "Free" to start
3. Click **"Create new project"**
4. Wait 2-3 minutes for your project to be provisioned

---

## 2. Setting Up Your Database

### Step 1: Get Your Database Credentials

1. In your Supabase Dashboard, go to **Settings** (gear icon) → **Database**
2. Scroll to **Connection String** section
3. Select the **"URI"** tab
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the database password you created earlier

### Step 2: Get Your API Keys

1. Go to **Settings** → **API**
2. You'll see three important values:
   - **Project URL**: `https://[project-ref].supabase.co`
   - **anon/public key**: A long string starting with `eyJ...`
   - **service_role key**: Another long string (keep this secret!)
3. Copy all three values - you'll need them next

---

## 3. Creating Storage Buckets

Storage buckets are where your recipe images and nutrition labels will be stored.

### Step 1: Create Buckets
1. In Supabase Dashboard, click **Storage** in the left sidebar
2. Click **"New bucket"**
3. Create the following buckets:

#### Bucket 1: recipe-images
- **Name**: `recipe-images`
- **Public**: ✅ Enable
- **Allowed MIME types**: `image/*` (enter without quotes)
- **Max file size**: `5 MB` or `5242880` bytes
- Click **"Create bucket"**

#### Bucket 2: nutrition-labels
- **Name**: `nutrition-labels`
- **Public**: ✅ Enable
- **Allowed MIME types**: `image/*` (enter without quotes)
- **Max file size**: `5 MB` or `5242880` bytes
- Click **"Create bucket"**

#### Bucket 3: food-labels
- **Name**: `food-labels`
- **Public**: ✅ Enable
- **Allowed MIME types**: `image/*` (enter without quotes)
- **Max file size**: `5 MB` or `5242880` bytes
- Click **"Create bucket"**

### Step 2: Set Up Storage Policies

For each bucket, you need to set up Row Level Security (RLS) policies.

**Important**: Create these policies in the **Storage** section, NOT in the Schema/Database section.

#### Method 1: Using SQL Editor (Recommended)

1. Go to **SQL Editor** in the left sidebar
2. Click **"New Query"**
3. Copy and paste ALL the policies below for each bucket
4. Click **"Run"**

**For recipe-images bucket:**
```sql
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'recipe-images');

CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'recipe-images');

CREATE POLICY "Allow users to delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'recipe-images' AND auth.uid()::text = owner::text);
```

**For nutrition-labels bucket:**
```sql
CREATE POLICY "Allow authenticated uploads nutrition"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'nutrition-labels');

CREATE POLICY "Allow public read nutrition"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'nutrition-labels');

CREATE POLICY "Allow users to delete own files nutrition"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'nutrition-labels' AND auth.uid()::text = owner::text);
```

**For food-labels bucket:**
```sql
CREATE POLICY "Allow authenticated uploads food"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'food-labels');

CREATE POLICY "Allow public read food"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'food-labels');

CREATE POLICY "Allow users to delete own files food"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'food-labels' AND auth.uid()::text = owner::text);
```

#### Method 2: Using the Policy Builder UI

Alternatively, you can use the visual policy builder:

1. In **Storage** section, click on the bucket name (e.g., `recipe-images`)
2. Click the **"Policies"** tab
3. Click **"New Policy"**
4. Select a template or create custom:
   - **For uploads**: Select "Allow authenticated users to upload"
   - **For reads**: Select "Allow public access to read"
   - **For deletes**: Create custom policy for user's own files
5. Repeat for each bucket

---

## 4. Configuring Your Project

### Step 1: Create Your .env File

1. In your project root, copy `.env.example` to `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Open `.env.local` and fill in your Supabase credentials:

```env
# Database URL (from Step 2.1)
DATABASE_URL=postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres

# Supabase Configuration (from Step 2.2)
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (your anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (your service role key)
```

### Step 2: Install Dependencies

Run the following command to install the Supabase package:

```bash
npm install
```

---

## 5. Running Migrations

Now that your database is connected, you need to create the recipe tables.

### Step 1: Generate Migration

Run this command to generate a migration file based on your schema:

```bash
npm run db:generate
```

This will create a new migration file in the `migrations/` folder.

### Step 2: Apply Migration

To apply the migration to your Supabase database:

```bash
npm run db:migrate
```

### Alternative: Run Migration Manually

If you prefer, you can also run the migration manually in Supabase:

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Open the generated migration file from `migrations/` folder
4. Copy and paste the SQL code
5. Click **"Run"**

---

## 6. Testing the Connection

### Step 1: Verify Database Tables

1. Go to Supabase Dashboard → **Table Editor**
2. You should see the following tables:
   - `organization`
   - `todo`
   - `recipe`
   - `recipe_ingredient`
   - `food_label`
   - `nutrition`

### Step 2: Test Storage Upload

Create a simple test in your application:

```typescript
import { uploadFile } from '@/libs/Supabase';

// Example: Upload a test image
const testUpload = async (file: File) => {
  try {
    const result = await uploadFile(
      'recipe-images',
      `test/${file.name}`,
      file,
      true
    );
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### Step 3: Start Your Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and verify everything works!

---

## 🎯 Next Steps

Now that Supabase is connected, you can:

1. **Create Recipe Forms**: Build forms to add new recipes
2. **Upload Images**: Implement image upload for recipe photos
3. **Display Recipes**: Create pages to display saved recipes
4. **Add Nutrition Data**: Store and display nutrition information
5. **Implement Search**: Add search functionality for recipes

---

## 📚 Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 🆘 Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Make sure your `.env.local` file exists and contains all required Supabase variables.

### Issue: Migration fails
**Solution**:
1. Check your `DATABASE_URL` is correct
2. Ensure your Supabase project is active
3. Try running the migration manually in the SQL Editor

### Issue: Upload fails
**Solution**:
1. Verify storage buckets are created
2. Check storage policies are set up correctly
3. Ensure file size is within limits (5 MB)

### Issue: Connection timeout
**Solution**:
1. Check your internet connection
2. Verify the Supabase project is in the correct region
3. Try using the direct connection string instead of pooler

---

## 📞 Need Help?

If you encounter any issues:
1. Check the [Supabase Discord](https://discord.supabase.com)
2. Review the [GitHub Discussions](https://github.com/supabase/supabase/discussions)
3. Check your browser console for error messages

Happy coding! 🚀
