

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
  } catch (error: unknown) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message ?? 'Unknown error' }, { status: 500 });
    } else {
      // If it's not an instance of Error, handle it as a generic error
      return NextResponse.json({ success: false, message: 'Unknown error' }, { status: 500 });
    }
  }
}
