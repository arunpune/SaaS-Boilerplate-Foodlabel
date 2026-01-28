import { createClient } from '@supabase/supabase-js';

import { Env } from './Env';

/**
 * Supabase Client for Storage Operations
 *
 * This client is configured to work with Supabase Storage for:
 * - Recipe images
 * - Nutrition labels
 * - Food photos
 * - Step-by-step cooking images
 *
 * Storage Buckets to create in Supabase Dashboard:
 * - 'recipe-images' - for general recipe photos
 * - 'nutrition-labels' - for scanned/uploaded nutrition labels
 * - 'food-labels' - for all food-related images
 */

// Client-side Supabase client (uses anonymous key)
export const getSupabaseClient = () => {
  const supabaseUrl = Env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = Env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// Server-side Supabase client (uses service role key for admin operations)
export const getSupabaseAdminClient = () => {
  const supabaseUrl = Env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = Env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase admin environment variables. Please check your .env file.');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

/**
 * Upload a file to Supabase Storage
 * @param bucket - The storage bucket name
 * @param path - The file path in the bucket
 * @param file - The file to upload
 * @param isPublic - Whether the file should be publicly accessible (default: true)
 * @returns The public URL of the uploaded file
 */
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File | Blob,
  isPublic: boolean = true,
) => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  if (isPublic) {
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      url: publicData.publicUrl,
    };
  }

  return {
    path: data.path,
    url: null,
  };
};

/**
 * Delete a file from Supabase Storage
 * @param bucket - The storage bucket name
 * @param path - The file path in the bucket
 */
export const deleteFile = async (bucket: string, path: string) => {
  const supabase = getSupabaseClient();

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }

  return { success: true };
};

/**
 * Get a signed URL for a private file (temporary access)
 * @param bucket - The storage bucket name
 * @param path - The file path in the bucket
 * @param expiresIn - Expiration time in seconds (default: 3600 = 1 hour)
 */
export const getSignedUrl = async (
  bucket: string,
  path: string,
  expiresIn: number = 3600,
) => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw new Error(`Failed to create signed URL: ${error.message}`);
  }

  return data.signedUrl;
};

/**
 * List files in a bucket folder
 * @param bucket - The storage bucket name
 * @param folder - The folder path (default: root)
 */
export const listFiles = async (bucket: string, folder: string = '') => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.storage.from(bucket).list(folder);

  if (error) {
    throw new Error(`Failed to list files: ${error.message}`);
  }

  return data;
};
