import WaitlistForm from "./waitlist-form";
import PhoneScroll from "./phone-scroll";

export default function Home() {
  return (
    <>
      <div className="wrap">
  <nav>
    <div className="brand display"><img src="/icon.png" alt="Sillonner logo" />Sillonner</div>
    </nav>

  <header className="hero">
    <div>
      <h1 className="display">The creator economy, <span>in motion.</span></h1>
      <p className="lead">Sillonner is a personal brand operating system for creators. It shows you what is working in your content and points you to real paid opportunities, all in one place.</p>
    </div>
    <div className="phone-wrap" aria-label="Preview of the Sillonner app">
      <div>
        <div className="phone"><div className="screen">
          <div className="island"></div>
          <div className="status"><span>9:41</span><span className="ic">
            <svg width="17" height="11" viewBox="0 0 17 11" fill="#fff"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
            <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x=".5" y=".5" width="20" height="10" rx="3" stroke="#fff" opacity=".55"/><rect x="2" y="2" width="15" height="7" rx="1.8" fill="#fff"/><rect x="21.6" y="3.6" width="1.6" height="3.8" rx=".8" fill="#fff" opacity=".55"/></svg>
          </span></div>
          <div className="viewport" id="appscroll"><div className="set">
            <div className="sbar"><div className="brand display"><img src="/icon.png" alt="" />Sillonner</div><span>This week</span></div>
            <div className="hl">Reels are your strongest format<small>Based on the 24 posts you have logged</small></div>
            <div className="mini">
              <div className="t"><span>Engagement by post</span><span>Last 7</span></div>
              <div className="spark"><i style={{ height: '30%' }}></i><i style={{ height: '45%' }}></i><i className="on" style={{ height: '95%' }}></i><i style={{ height: '38%' }}></i><i style={{ height: '60%' }}></i><i style={{ height: '28%' }}></i><i style={{ height: '50%' }}></i></div>
              <div className="big">3.4x</div><div className="good">above your average</div>
            </div>
            <div className="mini">
              <div className="t"><span>Opportunity of the week</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>UGC creator, skincare brand<small>Fits your niche</small></div><span className="st">New</span></div>
              <span className="btn-s">Use pitch template</span>
            </div>
            <div className="nudge"><i></i>You have not posted in 3 days. Share one post today.</div>
            <div className="mini">
              <div className="t"><span>Recent posts</span><span>Content log</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>3 tips for new VAs<small>Instagram</small></div><span className="st">Top post</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>A day in my life<small>TikTok</small></div><span className="st b">Average</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>How I price my work<small>X</small></div><span className="st b">Low</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>Behind the scenes<small>Instagram</small></div><span className="st b">Average</span></div>
            </div>
            <div className="mini">
              <div className="t"><span>Weekly goal</span><span>3 of 4 posts</span></div>
              <div className="prog"><i></i></div>
              <div className="good" style={{ marginTop: '.5rem' }}>One more post to keep your streak</div>
            </div>
            <div className="mini">
              <div className="t"><span>Pitch template</span><span>Ready to send</span></div>
              <div className="pt">Hi [Brand], I create short videos for [niche] and my audience is exactly your customer. Can I send you a quick idea?</div>
              <span className="btn-s">Copy template</span>
            </div>
            <div className="mini">
              <div className="t"><span>More opportunities for you</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>Affiliate program, tech accessories<small>Fits your niche</small></div><span className="st b">New</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>Micro sponsorship, food brand<small>Pitched 2 days ago</small></div><span className="st b">Pending</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>Brand ambassador, fitness app<small>Fits your audience</small></div><span className="st">Ready</span></div>
            </div>
            <div className="mini">
              <div className="t"><span>Weekly nudge</span><span>Every Monday</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>Post at least 3 times<small>Keep your streak alive</small></div><span className="st b">On</span></div>
              <div className="op" style={{ marginTop: '.6rem' }}><div>Pitch one brand<small>One small win per week</small></div><span className="st b">On</span></div>
            </div>
</div></div>
          <div className="touch" id="touch"></div>
          <div className="tabs">
            <span className="on"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7v9H4z"/></svg>Home</span>
            <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>Log</span>
            <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>Offers</span>
            <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>Nudges</span>
          </div>
          <div className="homebar"></div>
        </div></div>
        <p className="sample">Preview with sample data</p>
      </div>
    </div>
  </header>

  <section className="sec" id="features">
    <h2 className="display">Everything between your first post and your first payment</h2>
    <p className="sub">Three tools, built around the problems creators told us they face every single week.</p>
    <div className="bento">
      <div className="bc b1">
        <span className="tag">Content log</span>
        <h3 className="display">See what is actually working</h3>
        <p>Add each post as you publish it. Sillonner compares it with your others and shows which hooks, formats, and topics are pulling their weight.</p>
        <div className="chart"><i style={{ height: '35%' }}></i><i className="on" style={{ height: '92%' }}></i><i style={{ height: '55%' }}></i><i style={{ height: '28%' }}></i><i style={{ height: '44%' }}></i><i style={{ height: '22%' }}></i></div>
        <div className="chartlbl"><span>Static</span><span>Reels</span><span>Carousel</span><span>Text</span><span>Story</span><span>Live</span></div>
      </div>
      <div className="bc b2">
        <span className="tag">Weekly nudge</span>
        <h3 className="display">Stay consistent</h3>
        <p>A short weekly check in that keeps you posting and keeps one opportunity in front of you.</p>
        <div className="notif"><div className="dot"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7"/><path d="M10 20a2 2 0 0 0 4 0"/></svg></div><div>Time to post<small>Your weekly nudge</small></div></div>
      </div>
      <div className="bc b3">
        <span className="tag">Pitch templates</span>
        <h3 className="display">Know what to say</h3>
        <p>Ready made outreach so reaching out to a brand is never the hard part.</p>
        <div className="pitch"><b>Hi [Brand],</b> I create short videos for [niche] and my audience is exactly your customer. Can I send you a quick idea?</div>
      </div>
      <div className="bc b4">
        <span className="tag">Opportunity finder</span>
        <h3 className="display">Your first paid opportunity</h3>
        <p>A curated list of brands, affiliate programs, and UGC gigs that work with creators at your stage.</p>
        <div className="list">
          <div className="li"><div>UGC creator, skincare brand<small>Pitch template ready</small></div><span className="st">Ready</span></div>
          <div className="li"><div>Affiliate program, tech accessories<small>Fits your niche</small></div><span className="st b">New</span></div>
          <div className="li"><div>Micro sponsorship, food brand<small>Pitched 2 days ago</small></div><span className="st b">Pending</span></div>
        </div>
      </div>
    </div>
  </section>
  <section className="final" id="join">
    <h2 className="display">Join the waitlist</h2>
    <WaitlistForm />
  </section>

  <footer>Sillonner 2026</footer>
</div>
      <PhoneScroll />
    </>
  );
}
