export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "Access Own Records": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      control_mode: {
        Row: {
          duration: number | null
          id: string
          success_flag: boolean | null
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          duration?: number | null
          id?: string
          success_flag?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          duration?: number | null
          id?: string
          success_flag?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "control_mode_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          ai_advice: string | null
          context_text: string | null
          created_at: string | null
          id: string
          reply_text: string | null
          screenshot_url: string | null
          user_id: string | null
        }
        Insert: {
          ai_advice?: string | null
          context_text?: string | null
          created_at?: string | null
          id?: string
          reply_text?: string | null
          screenshot_url?: string | null
          user_id?: string | null
        }
        Update: {
          ai_advice?: string | null
          context_text?: string | null
          created_at?: string | null
          id?: string
          reply_text?: string | null
          screenshot_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      scripts: {
        Row: {
          category: string | null
          content: string | null
          id: string
          title: string | null
          use_count: number | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          id?: string
          title?: string | null
          use_count?: number | null
        }
        Update: {
          category?: string | null
          content?: string | null
          id?: string
          title?: string | null
          use_count?: number | null
        }
        Relationships: []
      }
      tracker_logs: {
        Row: {
          id: string
          mood_rating: number | null
          notes: string | null
          outcome: string | null
          tags: string[] | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          mood_rating?: number | null
          notes?: string | null
          outcome?: string | null
          tags?: string[] | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          mood_rating?: number | null
          notes?: string | null
          outcome?: string | null
          tags?: string[] | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tracker_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          dating_style: string | null
          email: string | null
          id: string
          simp_mode_count: number | null
          voice_tone: string | null
        }
        Insert: {
          created_at?: string | null
          dating_style?: string | null
          email?: string | null
          id?: string
          simp_mode_count?: number | null
          voice_tone?: string | null
        }
        Update: {
          created_at?: string | null
          dating_style?: string | null
          email?: string | null
          id?: string
          simp_mode_count?: number | null
          voice_tone?: string | null
        }
        Relationships: []
      }
      voice_logs: {
        Row: {
          ai_feedback: string | null
          audio_note: string | null
          created_at: string | null
          id: string
          transcription: string | null
          user_id: string | null
        }
        Insert: {
          ai_feedback?: string | null
          audio_note?: string | null
          created_at?: string | null
          id?: string
          transcription?: string | null
          user_id?: string | null
        }
        Update: {
          ai_feedback?: string | null
          audio_note?: string | null
          created_at?: string | null
          id?: string
          transcription?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voice_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
