-- Create site_content table
CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.site_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.site_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON public.site_content FOR DELETE USING (auth.role() = 'authenticated');

-- Create practice_areas table
CREATE TABLE IF NOT EXISTS public.practice_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for practice_areas
ALTER TABLE public.practice_areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.practice_areas FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.practice_areas FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.practice_areas FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON public.practice_areas FOR DELETE USING (auth.role() = 'authenticated');

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT,
    short_description TEXT NOT NULL,
    extended_bio TEXT NOT NULL,
    qualifications TEXT[] NOT NULL DEFAULT '{}',
    is_support_staff BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.team_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON public.team_members FOR DELETE USING (auth.role() = 'authenticated');


-- ==========================================
-- SEED DATA
-- ==========================================

-- Seed About Section
INSERT INTO public.site_content (section_id, content) VALUES (
    'about',
    '{
        "main_paragraphs": [
            "CW Mathebula and Associates Inc. is a full-service commercial law firm headquartered in Bryanston, Sandton — Africa''s busiest hub of commerce and industry. We pride ourselves on delivering personalised, practical, and solution-driven legal services across Gauteng and Limpopo provinces.",
            "With offices in Johannesburg, Pretoria, Phalaborwa, Tzaneen, and Polokwane, we ensure access to quality legal representation across multiple jurisdictions. Our firm is committed to solving both simple and complex legal matters with the highest level of integrity and dedication.",
            "Founded on the principles of Truth, Justice, and Honour, we treat every client as though they are our only client — delivering maximum value, efficiency, and results."
        ],
        "highlights": [
            { "icon": "Scale", "title": "Legal Excellence", "description": "Committed to the highest standards of legal practice" },
            { "icon": "Building", "title": "Multiple Offices", "description": "Strategic locations across Gauteng and Limpopo" },
            { "icon": "Users", "title": "Client-Focused", "description": "Personalised attention for every legal matter" },
            { "icon": "Award", "title": "Proven Results", "description": "Track record of successful outcomes" }
        ]
    }'::jsonb
) ON CONFLICT (section_id) DO NOTHING;

-- Seed Contact Section
INSERT INTO public.site_content (section_id, content) VALUES (
    'contact',
    '{
        "emails": ["wisani@mathebulalaw.co.za", "mpho@mathebulalaw.co.za"],
        "phones": ["+27 76 998 1049", "+27 72 275 6235"],
        "locations": ["Johannesburg", "Pretoria", "Polokwane", "Tzaneen", "Phalaborwa"]
    }'::jsonb
) ON CONFLICT (section_id) DO NOTHING;

-- Seed Practice Areas
INSERT INTO public.practice_areas (title, description, icon_name, display_order) VALUES
('Litigation', 'Court representation and dispute resolution', 'Gavel', 1),
('Property Law', 'Real estate transactions and property rights', 'Home', 2),
('Commercial & Corporate Law', 'Business formation and corporate governance', 'Building2', 3),
('Insurance Law', 'Insurance claims and coverage disputes', 'Shield', 4),
('Trusts, Wills & Estates', 'Estate planning and administration', 'FileText', 5),
('Divorce & Family Law', 'Family matters and relationship disputes', 'Heart', 6),
('Employment & Labour Law', 'Workplace rights and employment disputes', 'Users', 7),
('Tax Law', 'Tax compliance and dispute resolution', 'Calculator', 8),
('Insolvency & Business Rescue', 'Financial distress and business recovery', 'AlertTriangle', 9),
('Contract Drafting & Disputes', 'Agreement preparation and enforcement', 'HandHeart', 10),
('Municipal Law', 'Local government and municipal matters', 'MapPin', 11),
('Mining Rights Law', 'Mining licenses and mineral rights', 'Mountain', 12);

-- Seed Team Members
-- Note: We temporarily use the local imported image paths for the seed, but these will eventually be replaced by the public Supabase storage URLs once the admin uploads new photos.
INSERT INTO public.team_members (name, role, image_url, short_description, extended_bio, qualifications, is_support_staff, display_order) VALUES
(
    'Wisani Mathebula', 
    'Managing Director & Attorney', 
    '/src/assets/wisani-mathebula.jpg', 
    'As the firm''s managing director and founder, Wisani brings strong media and economics background with expertise in litigation, commercial law, and property law.',
    'As the firm''s managing director and founder, Wisani is at the heart of CW Mathebula and Associates Inc. Wisani has a strong media and economics background having started out as a radio journalist for the SABC in Polokwane and Auckland Park mostly tasked with African economics stories, before enrolling with UNISA for an LLB Degree.

His love for knowledge has driven him to acquire degrees and certificates including a Public Relations diploma with Tshwane University of Technology, Financial Journalism certificate with the Gordon Institute of Business Studies, and a Radio Management Certificate with Wits University. He holds an LLM: Mercantile Law degree with University of Pretoria.

Wisani served his articles at Snymans Inc., a full spectrum conveyancing law firm before venturing on his own after admission as an attorney of the High Court of South Africa. With his flair for litigation, he has participated and won awards in several moot courts, coupled with his understanding of commercial law and property law.

With Wisani as your attorney, you are guaranteed full attention and service that seeks to solve your legal issues timeously. The principles of justice, fairness, truth, certainty and finality are key to Wisani''s legal philosophy and practice.',
    ARRAY['LLB Degree (UNISA)', 'LLM: Mercantile Law (UP)', 'Public Relations Diploma (TUT)', 'Financial Journalism Certificate (GIBS)', 'Radio Management Certificate (Wits)'],
    false,
    1
),
(
    'Dr Mpho Mokone-Mathebula', 
    'Research Consultant', 
    '/src/assets/dr-mpho-mokone-mathebula.jpg', 
    'Dr. Mpho holds a PhD in Psychology from the University of the Witwatersrand, where she currently serves as a Lecturer with a focus on social justice research.',
    'Dr. Mpho Mokone-Mathebula holds a PhD in Psychology from the University of the Witwatersrand, where she currently serves as a Lecturer in the Department of Psychology. Her research is driven by a deep commitment to social justice, with a particular focus on women''s emancipation, naked body protests, decoloniality, child protection, education, and the broader upliftment of society. These themes reflect her passion for addressing pressing social issues and contributing to meaningful change through academic inquiry.

She has written extensively on these topics and contributes regularly on TV and radio, on issues dealing with the intersectionality of race, gender, law, and economics.

At CW Mathebula and Associates Inc., Mpho is tasked with legal research and developing the latest legal library and information systems that we always tap on to when diagnosing legal problems and finding a suitable remedy. As a person with a deep love for people, empathetic and kind, Mpho will always make you feel valued as a client and that your legal situation matters.',
    ARRAY['PhD in Psychology (Wits)', 'University Lecturer', 'Social Justice Researcher', 'Legal Research Specialist', 'TV & Radio Contributor'],
    false,
    2
),
(
    'Vukosi Nxolwani', 
    'Legal Research & Marketing', 
    '/src/assets/vukosi-nxolwani.jpg', 
    'Vukosi is a visual artist who paints nature and portraits. He is interested in the human condition and human behaviour.',
    'Vukosi is a visual artist who paints nature and portraits. He is interested in the human condition and human behaviour. Vukosi studied for a Visual Arts degree at Tshwane University of Technology and holds a Theology Certificate from the Auckland Park Theological Seminary. He has a Marketing Management certificate from Mopani South East College and is responsible for marketing and business development of the law firm in Limpopo province, covering our Polokwane, Tzaneen and Phalaborwa offices.

When not busy with new clients and formulating marketing strategies, Vukosi enjoys exploring nature in the nearby Kruger National Park, running and reading novels. He loves languages and is conversant in all languages spoken in Limpopo province.',
    ARRAY['Visual Arts Degree (TUT)', 'Theology Certificate (Auckland Park Theological Seminary)', 'Marketing Management Certificate (Mopani South East College)', 'Business Development Specialist', 'Multilingual (All Limpopo Languages)'],
    false,
    3
),
(
    'Trivin Mandy Mkhombo', 
    'Legal Assistant', 
    '/placeholder.svg', 
    'Legal assistant responsible for document preparation, legal advice, diary management and general office management.',
    'Mandy Mkhombo is our legal assistant responsible for document preparation, legal advice, diary management and general office management. She has worked in the aviation industry and is currently studying for her degree in Industrial Psychology.

A bubbly personality with a warm smile, Mandy has a solid foundation in aviation principles alongside a keen understanding of human behaviour, decision-making, and performance. This ensures operational efficiency in our Bryanston, Sandton and Blackheath, Randburg offices, where Mandy works, alternating between the two office spaces depending on the matter at hand.

As a disciplined, detail-oriented, and adaptable individual who is committed to continuous professional growth, Mandy is an asset to our law firm. When she is not busy with clients and legal documents, Mandy enjoys travelling, attending functions with friends, cooking, and playing tennis. As a sports enthusiast, she is happy when watching or participating in sports. She likes driving, and her friends nicknamed her "the female Lewis Hamilton."',
    ARRAY[]::TEXT[],
    true,
    4
);
