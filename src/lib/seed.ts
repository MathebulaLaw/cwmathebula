import { db, Post, updateTagCounts } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
}

function extractExcerpt(content: string, maxLength = 150): string {
  const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

const practiceAreaPosts = [
  {
    title: "Understanding Litigation: Your Guide to Court Disputes",
    content: `<h2>What is Litigation?</h2>
<p>Litigation refers to the process of taking legal disputes through the court system. At CW Mathebula & Associates, we provide comprehensive litigation services to help clients navigate complex legal battles.</p>

<h3>Types of Litigation We Handle</h3>
<ul>
<li><strong>Civil Litigation:</strong> Disputes between individuals or organizations</li>
<li><strong>Commercial Litigation:</strong> Business-related disputes including contract breaches</li>
<li><strong>Employment Litigation:</strong> Workplace disputes and discrimination claims</li>
</ul>

<h3>Our Approach</h3>
<p>We believe in aggressive yet strategic representation. Our team works tirelessly to protect your interests while seeking the most efficient resolution possible.</p>

<h3>Why Choose Us?</h3>
<p>With years of experience in South African courts, our litigators bring deep expertise and a track record of success. We understand that every case is unique and tailor our strategy accordingly.</p>`,
    tags: ["Litigation", "Court", "Dispute Resolution"]
  },
  {
    title: "Property Law: Buying, Selling, and Managing Real Estate",
    content: `<h2>Comprehensive Property Law Services</h2>
<p>Property law encompasses all legal matters related to real estate, from residential purchases to commercial developments. CW Mathebula & Associates offers expert guidance throughout your property transactions.</p>

<h3>Our Property Law Services</h3>
<ul>
<li>Residential and commercial property transfers</li>
<li>Lease agreements and negotiations</li>
<li>Property development and zoning</li>
<li>Title deed issues and disputes</li>
<li>Boundary and servitude disputes</li>
</ul>

<h3>Buying Property?</h3>
<p>Our team will conduct thorough due diligence, review all documentation, and ensure your interests are protected throughout the transfer process.</p>

<h3>Selling Property?</h3>
<p>We assist sellers with preparing documentation, ensuring clear title, and facilitating smooth transfers to buyers.</p>`,
    tags: ["Property Law", "Real Estate", "Transfers"]
  },
  {
    title: "Commercial and Corporate Law: Building Strong Businesses",
    content: `<h2>Your Partner in Corporate Success</h2>
<p>Commercial and corporate law forms the backbone of any successful business. At CW Mathebula & Associates, we provide comprehensive legal solutions for businesses of all sizes.</p>

<h3>Our Corporate Services</h3>
<ul>
<li><strong>Business Formation:</strong> Registration of companies, close corporations, and trusts</li>
<li><strong>Corporate Governance:</strong> Advising on directors' duties and compliance</li>
<li><strong>Mergers & Acquisitions:</strong> Guiding through complex transactions</li>
<li><strong>Contract Drafting:</strong> Creating watertight commercial agreements</li>
</ul>

<h3>Why Corporate Legal Matters</h3>
<p>Proper legal structure and compliance protect your personal assets and ensure your business operates within the law. We help you build a solid foundation for growth.</p>`,
    tags: ["Corporate Law", "Business", "Commercial"]
  },
  {
    title: "Insurance Law: Protecting Your Claims",
    content: `<h2>Insurance Law Experts</h2>
<p>Insurance disputes can be complex and frustrating. Whether you're claim has been denied or you're facing a coverage dispute, CW Mathebula & Advocates is here to advocate for your rights.</p>

<h3>We Handle All Insurance Matters</h3>
<ul>
<li>Claim denial appeals</li>
<li>Coverage disputes</li>
<li>Bad faith claims against insurers</li>
<li>Third-party liability claims</li>
<li>Professional indemnity matters</li>
</ul>

<h3>Understanding Your Policy</h3>
<p>Insurance policies are often filled with complex terminology. Our team helps you understand your coverage and ensures insurers meet their obligations.</p>

<h3>Don't Accept a Denial</h3>
<p>Many valid claims are wrongfully denied. We challenge insurance companies and fight to get you the compensation you deserve.</p>`,
    tags: ["Insurance Law", "Claims", "Disputes"]
  },
  {
    title: "Wills, Trusts, and Estates: Securing Your Legacy",
    content: `<h2>Planning for the Future</h2>
<p>Estate planning is about more than just writing a will. At CW Mathebula & Associates, we help you protect your assets and ensure your loved ones are cared for after you're gone.</p>

<h3>Our Estate Planning Services</h3>
<ul>
<li><strong>Will Drafting:</strong> Clear, legally sound wills that reflect your wishes</li>
<li><strong>Trust Establishment:</strong> Living trusts, testamentary trusts, and family trusts</li>
<li><strong>Estate Administration:</strong> Guiding executors through the probate process</li>
<li><strong>Succession Planning:</strong> Business succession and wealth transfer strategies</li>
</ul>

<h3>Why You Need a Will</h3>
<p>Dying without a will (intestate) means the state decides how your assets are distributed. A properly drafted will ensures your wishes are honored.</p>

<h3>Protecting Vulnerable Family Members</h3>
<p>We help set up trusts to protect minors, disabled family members, or beneficiaries who may not be able to manage their inheritance.</p>`,
    tags: ["Wills", "Trusts", "Estates", "Estate Planning"]
  },
  {
    title: "Divorce and Family Law: Navigating Difficult Times",
    content: `<h2>Compassionate Legal Support</h2>
<p>Family law matters are often emotionally challenging. CW Mathebula & Associates provides sensitive, professional representation to help you through divorce, custody disputes, and other family matters.</p>

<h3>Our Family Law Services</h3>
<ul>
<li><strong>Divorce:</strong> Contested and uncontested divorce proceedings</li>
<li><strong>Custody and Access:</strong> Arrangements for children</li>
<li><strong>Maintenance:</strong> Spousal and child support matters</li>
<li><strong>Protection Orders:</strong> Domestic violence matters</li>
<li><strong>Adoption:</strong> Guiding families through the adoption process</li>
</ul>

<h3>Mediation First</h3>
<p>We encourage mediation and negotiation where possible, as this often leads to better outcomes for all parties, especially children.</p>

<h3>When Court is Necessary</h3>
<p>Sometimes litigation is unavoidable. Our experienced family law litigators will advocate fiercely for your interests in court.</p>`,
    tags: ["Family Law", "Divorce", "Custody"]
  },
  {
    title: "Employment and Labour Law: Workplace Rights",
    content: `<h2>Protecting Employee and Employer Rights</h2>
<p>Employment law governs the relationship between employers and employees. CW Mathebula & Associates represents both employers and employees in workplace disputes.</p>

<h3>For Employees</h3>
<ul>
<li>Unfair dismissal claims</li>
<li>Discrimination and harassment cases</li>
<li>Wage and hour disputes</li>
<li>Constructive dismissal</li>
<li>Employment contract review</li>
</ul>

<h3>For Employers</h3>
<ul>
<li>Employment policy development</li>
<li>Disciplinary procedures</li>
<li>CCMA representation</li>
<li>Contract drafting</li>
<li>Workplace investigations</li>
</ul>

<h3>Understanding Your Rights</h3>
<p>Both employers and employees have rights under South African labour law. We help you understand and enforce those rights.</p>`,
    tags: ["Employment Law", "Labour", "Workplace"]
  },
  {
    title: "Tax Law: Navigating SARS Requirements",
    content: `<h2>Tax Law Expertise</h2>
<p>Tax obligations can be complex and costly mistakes. CW Mathebula & Associates provides expert tax advice to help individuals and businesses comply with SARS requirements.</p>

<h3>Our Tax Services</h3>
<ul>
<li><strong>Tax Planning:</strong> Legal strategies to minimize tax liability</li>
<li><strong>Tax Compliance:</strong> Ensuring accurate returns and filings</li>
<li><strong>Tax Disputes:</strong> Representing clients in SARS disputes</li>
<li><strong>Estate Tax:</strong> Planning for estate and inheritance taxes</li>
<li><strong>Corporate Tax:</strong> Business tax planning and compliance</li>
</ul>

<h3>Dealing with SARS</h3>
<p>If you're facing a SARS audit, dispute, or investigation, we provide strong advocacy to protect your interests.</p>

<h3>Proactive Planning</h3>
<p>The best tax strategy is planned in advance. We work with you throughout the year to ensure you're optimized for tax efficiency.</p>`,
    tags: ["Tax Law", "SARS", "Tax Planning"]
  }
];

async function seedPosts() {
  const existingPosts = await db.posts.count();
  if (existingPosts > 0) {
    console.log('Database already has posts, skipping seed');
    return;
  }

  const now = new Date();
  
  for (let i = 0; i < practiceAreaPosts.length; i++) {
    const postData = practiceAreaPosts[i];
    const post: Post = {
      id: uuidv4(),
      title: postData.title,
      content: postData.content,
      excerpt: extractExcerpt(postData.content),
      slug: generateSlug(postData.title),
      tags: postData.tags,
      published: true,
      createdAt: new Date(now.getTime() - (i * 86400000)),
      updatedAt: new Date(now.getTime() - (i * 86400000))
    };
    
    await db.posts.add(post);
  }

  await updateTagCounts();
  console.log('Seeded 8 practice area blog posts');
}

seedPosts().catch(console.error);
