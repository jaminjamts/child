# Supabase Setup Guide

This guide will help you set up Supabase for this project.

## 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Wait for the project to be fully initialized

## 2. Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## 3. Configure Environment Variables

Create a `.env` file in the root directory (if it doesn't exist) and add:

```env
EXPO_PUBLIC_SUPABASE_URL=your-project-url-here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-project-url-here` and `your-anon-key-here` with the values from step 2.

**Important**: The `.env` file is already added to `.gitignore` to keep your keys secure.

## 4. Create Database Tables

Run the following SQL in your Supabase SQL Editor to create the necessary tables:

### Reports Table

```sql
-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mood_level INTEGER,
  action_type TEXT,
  location TEXT,
  role TEXT,
  gender TEXT,
  age TEXT,
  school TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public insert on reports" ON reports;

-- Create a policy that allows anyone (including anonymous users) to insert reports
-- Note: 'anon' role is required for anonymous access via anon key
CREATE POLICY "Allow public insert on reports"
  ON reports
  FOR INSERT
  TO public, anon, authenticated
  WITH CHECK (true);

-- Optional: Create a policy that allows authenticated users to read their own reports
-- CREATE POLICY "Users can read own reports"
--   ON reports FOR SELECT
--   USING (auth.uid() = user_id);
```

### Diary Messages Table

```sql
-- Create diary_messages table
CREATE TABLE IF NOT EXISTS diary_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  is_own BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE diary_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert diary messages
CREATE POLICY "Allow public insert on diary_messages"
  ON diary_messages FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows anyone to read diary messages
CREATE POLICY "Allow public read on diary_messages"
  ON diary_messages FOR SELECT
  USING (true);
```

## 5. Restart Your Development Server

After setting up the environment variables, restart your development server:

```bash
npm run dev
```

## 6. Test the Integration

1. Fill out a report in the Report screen and submit it
2. Check your Supabase dashboard → Table Editor → `reports` table to see the saved data
3. Send a message in the Diary screen
4. Check the `diary_messages` table to see the saved messages

## Troubleshooting

### Error: "Missing Supabase environment variables"

- Make sure your `.env` file exists in the root directory
- Check that the variable names start with `EXPO_PUBLIC_`
- Restart your development server after creating/updating `.env`

### Error: "relation does not exist"

- Make sure you've run the SQL scripts to create the tables
- Check that the table names match exactly: `reports` and `diary_messages`

### Error: "new row violates row-level security policy"

- Make sure you've created the RLS policies as shown in step 4
- Check that the policies allow the operations you're trying to perform
- If the error persists, run this SQL to check and fix the policy:

  ```sql
  -- Check existing policies
  SELECT * FROM pg_policies WHERE tablename = 'reports';

  -- Drop and recreate the policy with anon role explicitly included
  DROP POLICY IF EXISTS "Allow public insert on reports" ON reports;
  CREATE POLICY "Allow public insert on reports"
    ON reports
    FOR INSERT
    TO public, anon, authenticated
    WITH CHECK (true);
  ```

  **Important**: The `anon` role must be explicitly included when using the anon key. If your policy only shows `{public}` in the roles, you need to recreate it with `TO public, anon, authenticated`.

## Next Steps

- Consider adding authentication to protect user data
- Add user-specific data filtering
- Implement data validation on the database level
- Add indexes for better query performance
