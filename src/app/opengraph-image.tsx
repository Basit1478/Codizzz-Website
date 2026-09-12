import {ImageResponse} from "next/og";

export const runtime = "edge";
export const alt = "Codizzz — Your need, engineered into a digital product";
export const size = {width: 1200, height: 630};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "58px 64px",
        background: "#100f0e",
        color: "#f7f4ee",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{position: "absolute", width: 620, height: 620, borderRadius: 620, border: "1px solid #3a3631", right: -180, top: -250, display: "flex"}} />
      <div style={{position: "absolute", width: 500, height: 500, borderRadius: 500, border: "2px dashed #f12608", right: -80, bottom: -330, display: "flex", opacity: 0.65}} />
      <div style={{display: "flex", alignItems: "center", gap: 20, fontSize: 30, fontWeight: 800, letterSpacing: "0.08em"}}>
        <div style={{width: 54, height: 18, borderRadius: 20, border: "5px solid #f12608", transform: "skewX(-28deg)", display: "flex"}} />
        CODIZZZ
      </div>
      <div style={{display: "flex", flexDirection: "column", maxWidth: 930}}>
        <div style={{fontSize: 92, lineHeight: 0.92, fontWeight: 900, letterSpacing: "-0.055em", textTransform: "uppercase", display: "flex"}}>YOUR NEED. ENGINEERED</div>
        <div style={{fontSize: 92, lineHeight: 0.92, fontWeight: 900, letterSpacing: "-0.055em", textTransform: "uppercase", color: "#f12608", display: "flex"}}>INTO A DIGITAL PRODUCT.</div>
      </div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", color: "#bbb4aa", fontSize: 19, letterSpacing: "0.08em", textTransform: "uppercase"}}>
        <span>AI Agents · AI Automation · Custom Software</span>
        <span>Karachi · Pakistan</span>
      </div>
    </div>,
    size,
  );
}
