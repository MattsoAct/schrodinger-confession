import { supabase } from '../storage/supabase.js';
import { Confession } from '../../domain/entities/Confession.js';

export class SupabaseConfessionRepository {
  async save(confession) {
    const data = {
      id: confession.id,
      content: confession.content,
      receiver_name: confession.receiverName,
      sender_name: confession.senderName,
      attempts: confession.attempts,
      max_attempts: confession.maxAttempts,
      is_revealed: confession.isRevealed,
      is_premium: confession.isPremium,
      created_at: confession.createdAt.toISOString(),
      expires_at: confession.expiresAt?.toISOString()
    };

    const { data: result, error } = confession.id 
      ? await supabase.from('confessions').update(data).eq('id', confession.id).select().single()
      : await supabase.from('confessions').insert(data).select().single();

    if (error) {
      throw new Error(`Failed to save confession: ${error.message}`);
    }

    return Confession.fromData(result);
  }

  async findById(id) {
    const { data, error } = await supabase
      .from('confessions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to find confession: ${error.message}`);
    }

    return Confession.fromData(data);
  }

  async findByReceiver(receiverName) {
    const { data, error } = await supabase
      .from('confessions')
      .select('*')
      .eq('receiver_name', receiverName)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to find confessions: ${error.message}`);
    }

    return data.map(item => Confession.fromData(item));
  }

  async deleteExpired() {
    const { error } = await supabase
      .from('confessions')
      .delete()
      .lt('expires_at', new Date().toISOString());

    if (error) {
      throw new Error(`Failed to delete expired confessions: ${error.message}`);
    }
  }
}