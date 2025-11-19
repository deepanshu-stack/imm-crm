// import { NextRequest, NextResponse } from 'next/server';
// import { createSupabaseServerClient } from '@lib/supabase/server';

// export async function POST(req: NextRequest) {
//   try {
//     // 1) Supabase server client (uses cookies + service role key)
//     const supabase = await createSupabaseServerClient();

//     // 2) Get current session / user
//     const {
//       data: { session },
//       error: sessionError,
//     } = await supabase.auth.getSession();

//     if (sessionError || !session) {
//       return NextResponse.json(
//         { success: false, message: 'User not authenticated' },
//         { status: 401 }
//       );
//     }

//     // 3) Read multipart/form-data from the request
//     const formData = await req.formData();

//     const title = formData.get('title') as string | null;
//     const description = formData.get('description') as string | null;
//     const priority = formData.get('priority') as string | null;
//     const attachment = formData.get('attachment') as File | null;

//     if (!title || !priority) {
//       return NextResponse.json(
//         { success: false, message: 'Title and priority are required' },
//         { status: 400 }
//       );
//     }

//     // 4) Upload attachment if provided
//     let attachmentUrl: string | null = null;

//     if (attachment) {
//       const ext = attachment.name.split('.').pop() ?? 'bin';
//       const filePath = `tickets/${Date.now()}-${Math.random()
//         .toString(36)
//         .slice(2)}.${ext}`;

//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from('ticket-attachments')
//         .upload(filePath, attachment);

//       if (uploadError) {
//         console.error('Upload error:', uploadError.message);
//         return NextResponse.json(
//           { success: false, message: uploadError.message },
//           { status: 400 }
//         );
//       }

//       attachmentUrl = uploadData?.path ?? null;
//       console.log('Attachment URL:', attachmentUrl); // 👈 you wanted this log
//     }

//     // 5) Insert ticket row
//     const { error: insertError } = await supabase.from('tickets').insert({
//       title,
//       description: description ?? '',
//       priority,
//       status: 'open',
//       attachment_url: attachmentUrl,
//       client_id: session.user.id, // Use the authenticated user's ID
//     });

//     if (insertError) {
//       console.error('Insert error:', insertError.message);
//       return NextResponse.json(
//         { success: false, message: insertError.message },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: 'Ticket created successfully' },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error('Error creating ticket in API:', error);
//     return NextResponse.json(
//       { success: false, message: error?.message ?? 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }





// app/api/createTicket/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    // 1) Supabase server client (uses cookies + service role key)
    const supabase = await createSupabaseServerClient();

    // 2) Get current session / user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    // Check if session exists
    if (sessionError || !session) {
      return NextResponse.json({ success: false, message: 'User not authenticated' }, { status: 401 });
    }

    // 3) Read multipart/form-data from the request
    const formData = await req.formData();
    const title = formData.get('title') as string | null;
    const description = formData.get('description') as string | null;
    const priority = formData.get('priority') as string | null;
    const attachment = formData.get('attachment') as File | null;

    if (!title || !priority) {
      return NextResponse.json({ success: false, message: 'Title and priority are required' }, { status: 400 });
    }

    // 4) Upload attachment if provided
    let attachmentUrl: string | null = null;
    if (attachment) {
      const ext = attachment.name.split('.').pop() ?? 'bin';
      const filePath = `tickets/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { data: uploadData, error: uploadError } = await supabase.storage.from('ticket-attachments').upload(filePath, attachment);
      if (uploadError) {
        return NextResponse.json({ success: false, message: uploadError.message }, { status: 400 });
      }

      attachmentUrl = uploadData?.path ?? null;
    }

    // 5) Insert ticket row
    const { error: insertError } = await supabase.from('tickets').insert({
      title,
      description: description ?? '',
      priority,
      status: 'open',
      attachment_url: attachmentUrl,
      client_id: session.user.id,
    });

    if (insertError) {
      return NextResponse.json({ success: false, message: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Ticket created successfully' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message ?? 'Unknown error' }, { status: 500 });
  }
}




// // app/api/createTicket/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { createSupabaseServerClient } from '@lib/supabase/server';

// export async function POST(req: NextRequest) {
//   try {
//     // 1) Supabase server client (uses cookies + service role key)
//     const supabase = await createSupabaseServerClient();

//     // 2) Get current session / user
//     const {
//       data: { session },
//       error: sessionError,
//     } = await supabase.auth.getSession();

//     if (sessionError || !session) {
//       return NextResponse.json(
//         { success: false, message: 'User not authenticated' },
//         { status: 401 }
//       );
//     }

//     // 3) Read multipart/form-data from the request
//     const formData = await req.formData();

//     const title = formData.get('title') as string | null;
//     const description = formData.get('description') as string | null;
//     const priority = formData.get('priority') as string | null;
//     const attachment = formData.get('attachment') as File | null;

//     if (!title || !priority) {
//       return NextResponse.json(
//         { success: false, message: 'Title and priority are required' },
//         { status: 400 }
//       );
//     }

//     // 4) Upload attachment if provided
//     let attachmentUrl: string | null = null;

//     if (attachment) {
//       const ext = attachment.name.split('.').pop() ?? 'bin';
//       const filePath = `tickets/${Date.now()}-${Math.random()
//         .toString(36)
//         .slice(2)}.${ext}`;

//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from('ticket-attachments')
//         .upload(filePath, attachment);

//       if (uploadError) {
//         console.error('Upload error:', uploadError.message);
//         return NextResponse.json(
//           { success: false, message: uploadError.message },
//           { status: 400 }
//         );
//       }

//       attachmentUrl = uploadData?.path ?? null;
//       console.log('Attachment URL:', attachmentUrl); // 👈 you wanted this log
//     }

//     // 5) Insert ticket row
//     const { error: insertError } = await supabase.from('tickets').insert({
//       title,
//       description: description ?? '',
//       priority,
//       status: 'open',
//       attachment_url: attachmentUrl,
//       client_id: session.user.id,
//     });

//     if (insertError) {
//       console.error('Insert error:', insertError.message);
//       return NextResponse.json(
//         { success: false, message: insertError.message },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: 'Ticket created successfully' },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error('Error creating ticket in API:', error);
//     return NextResponse.json(
//       { success: false, message: error?.message ?? 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }
