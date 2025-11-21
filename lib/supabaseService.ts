import { supabase } from './supabase';
import { ReportData, Article } from '../types';

/**
 * Save a report to Supabase
 */
export async function saveReport(reportData: ReportData) {
  try {
    // Check current session for debugging
    const { data: sessionData } = await supabase.auth.getSession();
    console.log('Current session:', sessionData?.session ? 'Authenticated' : 'Anonymous');

    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
          mood_level: reportData.moodLevel,
          action_type: reportData.actionType,
          location: reportData.location,
          role: reportData.role,
          gender: reportData.gender,
          age: reportData.age,
          school: reportData.school,
          phone: reportData.phone,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Error saving report:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to save report:', error);
    throw error;
  }
}

/**
 * Save a diary message to Supabase
 */
export async function saveDiaryMessage(
  text: string,
  timestamp: string,
  isOwn: boolean = true
) {
  try {
    const { data, error } = await supabase
      .from('diary_messages')
      .insert([
        {
          text,
          timestamp,
          is_own: isOwn,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Error saving diary message:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to save diary message:', error);
    throw error;
  }
}

/**
 * Get diary messages from Supabase
 */
export async function getDiaryMessages() {
  try {
    const { data, error } = await supabase
      .from('diary_messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching diary messages:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch diary messages:', error);
    throw error;
  }
}

/**
 * Get articles from Supabase
 */
export async function getArticles() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
}

/**
 * Get a single article by ID from Supabase
 */
export async function getArticleById(id: string) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching article:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
}

