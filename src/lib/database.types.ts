export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      group: {
        Row: {
          id: number
          pack_id: number
          position: number
          title: string
          total_base_weight: number
          total_price: number
          total_quantity: number
          total_weight: number
          user_id: string
          weight_unit: string
        }
        Insert: {
          id?: number
          pack_id: number
          position: number
          title: string
          total_base_weight: number
          total_price: number
          total_quantity: number
          total_weight: number
          user_id: string
          weight_unit: string
        }
        Update: {
          id?: number
          pack_id?: number
          position?: number
          title?: string
          total_base_weight?: number
          total_price?: number
          total_quantity?: number
          total_weight?: number
          user_id?: string
          weight_unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_pack_id_fkey"
            columns: ["pack_id"]
            referencedRelation: "pack"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      inventory: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          price: number
          season: string
          title: string
          url: string | null
          user_id: string
          weight: number
          weight_unit: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          price: number
          season: string
          title: string
          url?: string | null
          user_id: string
          weight: number
          weight_unit: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          price?: number
          season?: string
          title?: string
          url?: string | null
          user_id?: string
          weight?: number
          weight_unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      pack: {
        Row: {
          base_weight: number
          created_at: string
          description: string
          id: number
          is_public: boolean
          share_id: string
          title: string
          total_cost: number
          total_items: number
          total_weight: number
          user_id: string
          weight_unit: string
        }
        Insert: {
          base_weight: number
          created_at?: string
          description: string
          id?: number
          is_public: boolean
          share_id?: string
          title: string
          total_cost: number
          total_items: number
          total_weight: number
          user_id: string
          weight_unit: string
        }
        Update: {
          base_weight?: number
          created_at?: string
          description?: string
          id?: number
          is_public?: boolean
          share_id?: string
          title?: string
          total_cost?: number
          total_items?: number
          total_weight?: number
          user_id?: string
          weight_unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "pack_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      pack_item: {
        Row: {
          group_id: number
          id: number
          inventory_id: number
          position: number
          quantity: number
          type: string
        }
        Insert: {
          group_id: number
          id?: number
          inventory_id: number
          position: number
          quantity: number
          type: string
        }
        Update: {
          group_id?: number
          id?: number
          inventory_id?: number
          position?: number
          quantity?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "pack_item_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pack_item_inventory_id_fkey"
            columns: ["inventory_id"]
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          }
        ]
      }
      trip: {
        Row: {
          base_weight: number
          created_at: string
          date: string
          distance: number
          distance_unit: string
          elevation: number
          elevation_unit: string
          id: number
          title: string
          total_weight: number
          user_id: string
          weight_unit: string
        }
        Insert: {
          base_weight: number
          created_at?: string
          date: string
          distance: number
          distance_unit: string
          elevation: number
          elevation_unit: string
          id?: number
          title: string
          total_weight: number
          user_id: string
          weight_unit: string
        }
        Update: {
          base_weight?: number
          created_at?: string
          date?: string
          distance?: number
          distance_unit?: string
          elevation?: number
          elevation_unit?: string
          id?: number
          title?: string
          total_weight?: number
          user_id?: string
          weight_unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          avatar_url: string | null
          email: string
          id: string
          name: string | null
          preferred_currency: string
        }
        Insert: {
          avatar_url?: string | null
          email: string
          id: string
          name?: string | null
          preferred_currency?: string
        }
        Update: {
          avatar_url?: string | null
          email?: string
          id?: string
          name?: string | null
          preferred_currency?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      wishlist: {
        Row: {
          created_at: string
          id: number
          image_url: string | null
          logo_url: string | null
          title: string | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          image_url?: string | null
          logo_url?: string | null
          title?: string | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string | null
          logo_url?: string | null
          title?: string | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_inventory: {
        Args: {
          search_term: string
        }
        Returns: {
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          price: number
          season: string
          title: string
          url: string | null
          user_id: string
          weight: number
          weight_unit: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

