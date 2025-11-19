// app/api/check-session.ts

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      return NextResponse.json({ success: false, message: 'User not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: 'User authenticated', user: session.user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message ?? 'Unknown error' }, { status: 500 });
  }
}
