import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const SIZES = ["Youth XS", "Youth S", "Youth M", "Youth L", "Youth XL", "Adult XS", "Adult S", "Adult M", "Adult L"];
const SUIT_TYPES = ["Jammer", "Brief", "One-Piece", "Two-Piece", "Tech Suit"];
const CONDITIONS = ["Like New", "Excellent", "Good"];
const PICKUP_SLOTS = [
  "Mon 5:30–6:30 PM Practice",
  "Wed 5:30–6:30 PM Practice",
  "Fri 5:30–6:30 PM Practice",
  "Sat 7:00–9:00 AM Morning Practice",
  "Next Home Meet – Sat",
];

const SAMPLE_LISTINGS = [
  { id: 1, swimmerName: "Sophie", size: "Youth M", suitType: "One-Piece", brand: "Speedo", condition: "Like New", color: "Navy/Gold", price: "Free", notes: "Worn 1 season, no fading. Perfect for a new swimmer!", listerName: "Jenna R.", listerContact: "jenna@email.com", status: "available", claimedBy: null, pickupSlot: null, postedDate: "Apr 28" },
  { id: 2, swimmerName: "Caden", size: "Youth L", suitType: "Jammer", brand: "TYR", condition: "Excellent", color: "Black", price: "$10", notes: "Great shape, elastic still firm.", listerName: "Marcus T.", listerContact: "marcus@email.com", status: "available", claimedBy: null, pickupSlot: null, postedDate: "Apr 30" },
  { id: 3, swimmerName: "Lily", size: "Youth S", suitType: "One-Piece", brand: "Arena", condition: "Good", color: "Red/White", price: "Free", notes: "Team colors! Small snag on strap but doesn't affect fit.", listerName: "Diana K.", listerContact: "diana@email.com", status: "claimed", claimedBy: "Park Family", pickupSlot: "Wed 5:30–6:30 PM Practice", postedDate: "Apr 25" },
];

function SwimSuitExchange() {
  const [listings, setListings] = useState(SAMPLE_LISTINGS);
  const [view, setView] = useState("browse");
  const [filterSize, setFilterSize] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("available");
  const [selectedListing, setSelectedListing] = useState(null);
  const [claimStep, setClaimStep] = useState(1);
  const [claimData, setClaimData] = useState({ name: "", contact: "", slot: "" });
  const [newListing, setNewListing] = useState({ swimmerName: "", size: "", suitType: "", brand: "", condition: "", color: "", price: "", notes: "", listerName: "", listerContact: "" });
  const [toast, setToast] = useState(null);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => { setAnimIn(false); const t = setTimeout(() => setAnimIn(true), 50); return () => clearTimeout(t); }, [view]);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };
  const filtered = listings.filter(l => { if (filterStatus !== "all" && l.status !== filterStatus) return false; if (filterSize !== "All" && l.size !== filterSize) return false; if (filterType !== "All" && l.suitType !== filterType) return false; return true; });
  const handleSubmitListing = () => { const req = ["swimmerName","size","suitType","condition","listerName","listerContact"]; if (req.some(f => !newListing[f])) { showToast("Please fill in all required fields."); return; } setListings(prev => [{ ...newListing, id: Date.now(), status: "available", claimedBy: null, pickupSlot: null, postedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }), price: newListing.price || "Free" }, ...prev]); setNewListing({ swimmerName:"",size:"",suitType:"",brand:"",condition:"",color:"",price:"",notes:"",listerName:"",listerContact:"" }); setView("browse"); showToast("Your listing is live!"); };
  const handleClaim = () => { if (!claimData.name || !claimData.contact || !claimData.slot) { showToast("Please complete all fields."); return; } setListings(prev => prev.map(l => l.id === selectedListing.id ? { ...l, status: "claimed", claimedBy: claimData.name, pickupSlot: claimData.slot } : l)); setView("confirm"); };
  const statusColor = (s) => s === "available" ? "#00b894" : s === "claimed" ? "#fdcb6e" : "#b2bec3";
  const statusLabel = (s) => s === "available" ? "Available" : s === "claimed" ? "Claimed" : "Picked Up";

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", minHeight: "100vh", background: "linear-gradient(160deg, #0a2342 0%, #1a5276 60%, #148f77 100%)", color: "#f0f8ff" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Paytone+One&display=swap');*{box-sizing:border-box;margin:0;padding:0}.card{background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.15);border-radius:18px;transition:transform 0.2s,box-shadow 0.2s}.card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,0.3)}.btn-primary{background:linear-gradient(135deg,#00cec9,#00b894);color:white;border:none;border-radius:50px;padding:12px 28px;font-family:'Nunito',sans-serif;font-size:15px;font-weight:800;cursor:pointer;transition:all 0.2s}.btn-secondary{background:rgba(255,255,255,0.12);color:#f0f8ff;border:1px solid rgba(255,255,255,0.25);border-radius:50px;padding:10px 24px;font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;cursor:pointer}.btn-claim{background:linear-gradient(135deg,#fdcb6e,#e17055);color:white;border:none;border-radius:50px;padding:10px 22px;font-family:'Nunito',sans-serif;font-size:14px;font-weight:800;cursor:pointer;width:100%}.field-group label{display:block;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;opacity:0.7;margin-bottom:6px}.field-group input,.field-group select,.field-group textarea{width:100%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:10px;padding:10px 14px;color:#f0f8ff;font-family:'Nunito',sans-serif;font-size:14px;outline:none}.field-group select option{background:#1a5276;color:white}.field-group input::placeholder,.field-group textarea::placeholder{color:rgba(255,255,255,0.35)}.pill{display:inline-block;padding:3px 10px;border-radius:50px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em}.filter-btn{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#f0f8ff;border-radius:50px;padding:7px 16px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap}.filter-btn.active{background:#00cec9;border-color:#00cec9}.slot-btn{background:rgba(255,255,255,0.07);border:2px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 16px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;color:#f0f8ff;cursor:pointer;text-align:left;width:100%}.slot-btn.selected{background:rgba(0,206,201,0.2);border-color:#00cec9}.fade-in{animation:fadeUp 0.35s ease forwards}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      {toast && <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:"rgba(0,206,201,0.95)",color:"white",padding:"12px 24px",borderRadius:50,fontWeight:700,fontSize:14,zIndex:1000 }}>{toast}</div>}
      <div style={{ position:"sticky",top:0,zIndex:100,background:"rgba(10,35,66,0.85)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.1)",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontSize:26 }}>🏊</span>
          <div>
            <div style={{ fontFamily:"'Paytone One',sans-serif",fontSize:18,lineHeight:1 }}>SuitSwap</div>
            <div style={{ fontSize:10,opacity:0.6,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em" }}>Swim Team Exchange</div>
          </div>
        </div>
        {view === "browse" && <button className="btn-primary" style={{ padding:"9px 20px",fontSize:13 }} onClick={() => setView("list")}>+ List a Suit</button>}
        {view !== "browse" && view !== "confirm" && <button className="btn-secondary" style={{ padding:"8px 18px",fontSize:13 }} onClick={() => { setView("browse"); setClaimStep(1); setClaimData({name:"",contact:"",slot:""}); }}>← Back</button>}
      </div>
      <div style={{ maxWidth:640,margin:"0 auto",padding:"20px 16px 60px",position:"relative",zIndex:1 }}>
        {view === "browse" && (
          <div className={animIn ? "fade-in" : ""}>
            <div style={{ marginBottom:20 }}>
              <h1 style={{ fontFamily:"'Paytone One',sans-serif",fontSize:26,marginBottom:4 }}>Find a Suit 🎽</h1>
              <p style={{ opacity:0.65,fontSize:14 }}>Suits listed by parents in our club. Claim one and arrange pickup at practice.</p>
            </div>
            <div style={{ display:"flex",gap:8,marginBottom:14,overflowX:"auto",paddingBottom:4 }}>
              {[["available","Available"],["claimed","Claimed"],["all","All Listings"]].map(([v,l]) => (
                <button key={v} className={`filter-btn ${filterStatus===v?"active":""}`} onClick={() => setFilterStatus(v)}>{l}</button>
              ))}
            </div>
            <div style={{ display:"flex",gap:8,marginBottom:20,overflowX:"auto" }}>
              <select style={{ background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:50,padding:"7px 16px",color:"#f0f8ff",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13 }} value={filterSize} onChange={e => setFilterSize(e.target.value)}>
                <option value="All">All Sizes</option>{SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select style={{ background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:50,padding:"7px 16px",color:"#f0f8ff",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13 }} value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="All">All Types</option>{SUIT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {filtered.map((listing) => (
                <div key={listing.id} className="card" style={{ padding:18 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                    <div>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                        <span style={{ fontFamily:"'Paytone One',sans-serif",fontSize:17 }}>{listing.brand || listing.suitType}</span>
                        <span className="pill" style={{ background:statusColor(listing.status)+"30",color:statusColor(listing.status) }}>{statusLabel(listing.status)}</span>
                      </div>
                      <div style={{ fontSize:13,opacity:0.75 }}>{listing.suitType} · {listing.size}{listing.color ? ` · ${listing.color}` : ""}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:"'Paytone One',sans-serif",fontSize:18,color:listing.price==="Free"?"#00b894":"#fdcb6e" }}>{listing.price}</div>
                      <div style={{ fontSize:11,opacity:0.5 }}>{listing.postedDate}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex",gap:8,marginBottom:10,flexWrap:"wrap" }}>
                    <span className="pill" style={{ background:"rgba(255,255,255,0.1)" }}>👤 {listing.swimmerName}'s suit</span>
                    <span className="pill" style={{ background:"rgba(255,255,255,0.1)" }}>✨ {listing.condition}</span>
                  </div>
                  {listing.notes && <div style={{ fontSize:13,opacity:0.7,marginBottom:12,fontStyle:"italic",lineHeight:1.5 }}>"{listing.notes}"</div>}
                  <div style={{ fontSize:12,opacity:0.6,marginBottom:12 }}>Listed by <strong>{listing.listerName}</strong></div>
                  {listing.status === "available" ? (
                    <button className="btn-claim" onClick={() => { setSelectedListing(listing); setClaimStep(1); setView("claim"); }}>🙋 Claim This Suit</button>
                  ) : listing.status === "claimed" ? (
                    <div style={{ background:"rgba(253,203,110,0.15)",border:"1px solid rgba(253,203,110,0.3)",borderRadius:12,padding:"10px 14px",fontSize:13 }}>
                      <strong>Claimed by {listing.claimedBy}</strong>
                      <div style={{ opacity:0.75,marginTop:3 }}>Pickup: {listing.pickupSlot}</div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
        {view === "list" && (
          <div className={animIn ? "fade-in" : ""}>
            <h2 style={{ fontFamily:"'Paytone One',sans-serif",fontSize:24,marginBottom:6 }}>List a Suit</h2>
            <p style={{ opacity:0.65,fontSize:14,marginBottom:24 }}>Help another swimmer! Fill in your suit details below.</p>
            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <div className="field-group"><label>Swimmer's Name *</label><input placeholder="e.g. Emma" value={newListing.swimmerName} onChange={e => setNewListing(p => ({...p,swimmerName:e.target.value}))} /></div>
                <div className="field-group"><label>Brand</label><input placeholder="e.g. Speedo, TYR" value={newListing.brand} onChange={e => setNewListing(p => ({...p,brand:e.target.value}))} /></div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <div className="field-group"><label>Size *</label><select value={newListing.size} onChange={e => setNewListing(p => ({...p,size:e.target.value}))}><option value="">Select size</option>{SIZES.map(s => <option key={s}>{s}</option>)}</select></div>
                <div className="field-group"><label>Suit Type *</label><select value={newListing.suitType} onChange={e => setNewListing(p => ({...p,suitType:e.target.value}))}><option value="">Select type</option>{SUIT_TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <div className="field-group"><label>Condition *</label><select value={newListing.condition} onChange={e => setNewListing(p => ({...p,condition:e.target.value}))}><option value="">Select condition</option>{CONDITIONS.map(c => <option key={c}>{c}</option>)}</select></div>
                <div className="field-group"><label>Color</label><input placeholder="e.g. Navy/Gold" value={newListing.color} onChange={e => setNewListing(p => ({...p,color:e.target.value}))} /></div>
              </div>
              <div className="field-group"><label>Price</label><input placeholder="e.g. Free, $5, $10 (leave blank for Free)" value={newListing.price} onChange={e => setNewListing(p => ({...p,price:e.target.value}))} /></div>
              <div className="field-group"><label>Notes</label><textarea rows={3} placeholder="Any extra details..." value={newListing.notes} onChange={e => setNewListing(p => ({...p,notes:e.target.value}))} style={{ resize:"none" }} /></div>
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.12)",paddingTop:16 }}>
                <div style={{ fontWeight:800,marginBottom:12,fontSize:14 }}>Your Contact Info</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                  <div className="field-group"><label>Your Name *</label><input placeholder="e.g. Sarah J." value={newListing.listerName} onChange={e => setNewListing(p => ({...p,listerName:e.target.value}))} /></div>
                  <div className="field-group"><label>Email or Phone *</label><input placeholder="For the claimer to reach you" value={newListing.listerContact} onChange={e => setNewListing(p => ({...p,listerContact:e.target.value}))} /></div>
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop:8,width:"100%",padding:14 }} onClick={handleSubmitListing}>Post My Listing</button>
            </div>
          </div>
        )}
        {view === "claim" && selectedListing && (
          <div className={animIn ? "fade-in" : ""}>
            <h2 style={{ fontFamily:"'Paytone One',sans-serif",fontSize:24,marginBottom:6 }}>Claim This Suit</h2>
            <div className="card" style={{ padding:16,marginBottom:24 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div><div style={{ fontWeight:800,fontSize:16 }}>{selectedListing.brand} {selectedListing.suitType}</div><div style={{ fontSize:13,opacity:0.7 }}>{selectedListing.size} · {selectedListing.condition}</div></div>
                <div style={{ fontFamily:"'Paytone One',sans-serif",fontSize:20,color:selectedListing.price==="Free"?"#00b894":"#fdcb6e" }}>{selectedListing.price}</div>
              </div>
            </div>
            {claimStep === 1 && (
              <div>
                <div style={{ display:"flex",flexDirection:"column",gap:14,marginBottom:24 }}>
                  <div className="field-group"><label>Your Name *</label><input placeholder="e.g. The Johnson Family" value={claimData.name} onChange={e => setClaimData(p => ({...p,name:e.target.value}))} /></div>
                  <div className="field-group"><label>Email or Phone *</label><input placeholder="So the lister can reach you" value={claimData.contact} onChange={e => setClaimData(p => ({...p,contact:e.target.value}))} /></div>
                </div>
                <button className="btn-primary" style={{ width:"100%",padding:14 }} onClick={() => { if (!claimData.name || !claimData.contact) { showToast("Please fill in your name and contact."); return; } setClaimStep(2); }}>Next: Pick Pickup Time</button>
              </div>
            )}
            {claimStep === 2 && (
              <div>
                <div style={{ fontWeight:800,marginBottom:16 }}>Pick a Pickup Slot</div>
                <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:24 }}>
                  {PICKUP_SLOTS.map(slot => (
                    <button key={slot} className={`slot-btn ${claimData.slot===slot?"selected":""}`} onClick={() => setClaimData(p => ({...p,slot}))}>{slot}</button>
                  ))}
                </div>
                <div style={{ background:"rgba(0,206,201,0.1)",border:"1px solid rgba(0,206,201,0.25)",borderRadius:14,padding:14,marginBottom:20,fontSize:13 }}>
                  <div style={{ fontWeight:800,marginBottom:4 }}>Lister Contact</div>
                  <div>{selectedListing.listerName} — <strong>{selectedListing.listerContact}</strong></div>
                </div>
                <button className="btn-primary" style={{ width:"100%",padding:14 }} onClick={handleClaim}>Confirm Claim</button>
              </div>
            )}
          </div>
        )}
        {view === "confirm" && (
          <div style={{ textAlign:"center",paddingTop:40 }}>
            <div style={{ fontSize:72,marginBottom:16 }}>🏊</div>
            <h2 style={{ fontFamily:"'Paytone One',sans-serif",fontSize:28,marginBottom:10 }}>You're all set!</h2>
            <p style={{ opacity:0.75,fontSize:15,lineHeight:1.6,marginBottom:28 }}>You've claimed the suit. Show up at your chosen time and look for <strong>{selectedListing?.listerName}</strong> at the club.</p>
            <div className="card" style={{ padding:20,textAlign:"left",marginBottom:28 }}>
              <div style={{ fontWeight:800,marginBottom:12,fontSize:15 }}>Claim Summary</div>
              <div style={{ display:"flex",flexDirection:"column",gap:8,fontSize:14 }}>
                {[["Suit",`${selectedListing?.brand} ${selectedListing?.suitType}`],["Size",selectedListing?.size],["Price",selectedListing?.price],["Pickup",claimData.slot],["Contact",selectedListing?.listerContact]].map(([k,v]) => (
                  <div key={k} style={{ display:"flex",justifyContent:"space-between" }}><span style={{ opacity:0.65 }}>{k}</span><span style={{ fontWeight:700 }}>{v}</span></div>
                ))}
              </div>
            </div>
            <button className="btn-primary" style={{ padding:"14px 40px" }} onClick={() => { setView("browse"); setClaimStep(1); setClaimData({name:"",contact:"",slot:""}); }}>Back to Listings</button>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><SwimSuitExchange /></React.StrictMode>
);
