export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      histories: {
        Row: {
          id: string;
          title: string;
          content: string;
          imageUrl: string | null;
          summary: string | null;
          categoryId: string;
          likeCount: number;
          createdAt: Date;
          updatedAt: Date | null;
          deletedAt: Date | null;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          imageUrl?: string | null;
          summary?: string | null;
          categoryId: string;
          createdAt?: Date;
          updatedAt?: Date | null;
          deletedAt?: Date | null;
          likeCount?: number;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          imageUrl?: string | null;
          summary?: string | null;
          categoryId?: string;
          createdAt?: Date;
          updatedAt?: Date | null;
          deletedAt?: Date | null;
          likeCount?: number;
        };
      };
      accessLogs: {
        Row: {
          id: string;
          guestToken: string;
          historyId: string | null;
          ipAddress: string;
          userAgent: string;
          createdAt: Date;
          deletedAt: Date | null;
        };
        Insert: {
          id?: string;
          historyId?: string | null;
          guestToken: string;
          ipAddress: string;
          userAgent: string;
          createdAt?: Date;
          deletedAt?: Date | null;
        };
        Update: {
          id?: string;
          historyId?: string;
          guestToken?: string | null;
          createdAt?: Date;
          deletedAt?: Date | null;
        };
      };
      likes: {
        Row: {
          id: string;
          historyId: string;
          guestToken: string;
          createdAt: Date;
          deletedAt: Date | null;
        };
        Insert: {
          id?: string;
          historyId: string;
          guestToken: string;
          createdAt?: Date;
          deletedAt?: Date | null;
        };
        Update: {
          id?: string;
          historyId?: string;
          guestToken?: string;
          createdAt?: Date;
          deletedAt?: Date | null;
        };
      };
    };
  };
}
