import { CallIntelligenceRecord } from "@/types/callIntelligence";

/**
 * Helper to escape HTML characters safely
 */
function escapeHtml(str: string | undefined | null): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Format masked phone number for privacy display
 */
export function formatMaskedPhone(phone: string): string {
  if (!phone) return "—";
  const cleaned = phone.trim();
  if (cleaned.length < 8) return cleaned;
  // Mask middle digits, e.g. +91 98*** **982
  const visiblePrefix = cleaned.slice(0, 5);
  const visibleSuffix = cleaned.slice(-3);
  return `${visiblePrefix}****${visibleSuffix}`;
}

/**
/**
 * Print or download document as PDF using an invisible in-page iframe
 * to avoid redirecting or opening new browser tabs.
 */
function openPrintWindow(title: string, htmlContent: string) {
  // Remove any previously created print iframe
  const existingFrame = document.getElementById("swaram-print-frame");
  if (existingFrame) {
    existingFrame.remove();
  }

  const iframe = document.createElement("iframe");
  iframe.id = "swaram-print-frame";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!doc || !iframe.contentWindow) return;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>${escapeHtml(title)}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        
        * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #FFFFFF;
          color: #283A50;
          margin: 0;
          padding: 24px;
          line-height: 1.5;
          font-size: 13px;
        }

        .no-print { display: none !important; }

        .header-bar {
          border-bottom: 2px solid #E9E1D4;
          padding-bottom: 16px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .brand-badge {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #2E8066;
          background: #EAF5F0;
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-block;
          margin-bottom: 6px;
        }
        h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #283A50; }
        .meta-line { font-size: 12px; color: #707684; }

        .card {
          background: #FFFFFF;
          border: 1px solid #E9E1D4;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .section-title {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #707684;
          margin: 0 0 12px 0;
          border-bottom: 1px solid #E9E1D4;
          padding-bottom: 6px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .field-item {
          background: #FAF5E9;
          border: 1px solid #E9E1D4;
          padding: 10px 14px;
          border-radius: 8px;
        }
        .field-label {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          color: #707684;
          margin-bottom: 2px;
        }
        .field-value {
          font-size: 13px;
          font-weight: 600;
          color: #283A50;
        }

        .badge-status {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 9999px;
        }
        .status-completed { background: #EAF5F0; color: #2E8066; border: 1px solid #B8E2D4; }
        .status-in-progress { background: #E0E7FF; color: #3730A3; border: 1px solid #C7D2FE; }
        .status-queued { background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A; }
        .status-failed { background: #FEE2E2; color: #991B1B; border: 1px solid #FECACA; }

        .transcript-bubble {
          margin-bottom: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          page-break-inside: avoid;
        }
        .bubble-agent {
          background: #F4F6F8;
          border-left: 3px solid #283A50;
        }
        .bubble-caller {
          background: #FAF5E9;
          border-left: 3px solid #2E8066;
        }
        .speaker-name {
          font-size: 11px;
          font-weight: 700;
          color: #283A50;
          margin-bottom: 2px;
        }
        .turn-time {
          font-size: 10px;
          color: #707684;
          margin-left: 6px;
          font-family: 'JetBrains Mono', monospace;
        }
        .turn-text {
          font-size: 12.5px;
          color: #283A50;
          line-height: 1.45;
        }

        .page-break {
          page-break-before: always;
          break-before: page;
          margin-top: 24px;
        }

        .toc-table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
        }
        .toc-table th, .toc-table td {
          border: 1px solid #E9E1D4;
          padding: 8px 12px;
          text-align: left;
          font-size: 12px;
        }
        .toc-table th {
          background: #FAF5E9;
          font-weight: 700;
          color: #283A50;
        }

        @media print {
          body { padding: 0; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; break-before: page; }
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `);
  doc.close();

  // Trigger print directly inside the hidden iframe without opening a new tab
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (e) {
      console.error("Print error:", e);
    }
  }, 250);
}

/**
 * 1. Download Individual Key Points as PDF Report
 */
export function downloadIndividualKeyPointsPdf(call: CallIntelligenceRecord) {
  const purposeFieldsHtml = call.purposeSpecificFields
    .map(
      (f) => `
      <div class="field-item">
        <div class="field-label">${escapeHtml(f.label)}${f.isEdited ? ' <span style="color:#B45309;font-size:9px;">(User-Edited)</span>' : ""}</div>
        <div class="field-value">${escapeHtml(f.value || "Not mentioned")}</div>
      </div>
    `
    )
    .join("");

  const mainQuestionsHtml = call.generalKeyPoints.mainQuestions.length > 0
    ? call.generalKeyPoints.mainQuestions.map((q) => `<li>${escapeHtml(q)}</li>`).join("")
    : "<li>None identified</li>";

  const customerNeedsHtml = call.generalKeyPoints.needsAndInterests.length > 0
    ? call.generalKeyPoints.needsAndInterests.map((n) => `<li>${escapeHtml(n)}</li>`).join("")
    : "<li>Not mentioned</li>";

  const agreedActionsHtml = call.generalKeyPoints.agreedActions.length > 0
    ? call.generalKeyPoints.agreedActions.map((a) => `<li>${escapeHtml(a)}</li>`).join("")
    : "<li>None specified</li>";

  const html = `
    <div class="header-bar">
      <div>
        <span class="brand-badge">Swaram Call Intelligence</span>
        <h1>Call Key Points Dossier: ${escapeHtml(call.contactName)}</h1>
        <div class="meta-line">
          Purpose: <strong>${escapeHtml(call.callingPurpose)}</strong> • Campaign: <strong>${escapeHtml(call.campaignName)}</strong> • ID: <code>${escapeHtml(call.id)}</code>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="badge-status status-${call.lifecycleStatus}">${escapeHtml(call.lifecycleStatus.toUpperCase())}</span>
        <div style="font-size: 11px; color: #707684; margin-top: 6px;">
          Generated: ${new Date().toLocaleDateString()}
        </div>
      </div>
    </div>

    <!-- Essential Metadata -->
    <div class="card">
      <div class="section-title">Call Metadata & Execution Status</div>
      <div class="grid-3">
        <div class="field-item">
          <div class="field-label">Contact Name & Phone</div>
          <div class="field-value">${escapeHtml(call.contactName)} (${escapeHtml(call.contactPhone)})</div>
        </div>
        <div class="field-item">
          <div class="field-label">AI Agent & Language</div>
          <div class="field-value">${escapeHtml(call.agentName)} (${escapeHtml(call.language)})</div>
        </div>
        <div class="field-item">
          <div class="field-label">Date, Time & Duration</div>
          <div class="field-value">${escapeHtml(call.date)} ${escapeHtml(call.timestamp)} • ${escapeHtml(call.duration)}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Call Type</div>
          <div class="field-value" style="text-transform: capitalize;">${escapeHtml(call.callType)} Call</div>
        </div>
        <div class="field-item">
          <div class="field-label">Conversation Outcome</div>
          <div class="field-value" style="color: #2E8066;">${escapeHtml(call.conversationOutcome)}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Follow-up Required</div>
          <div class="field-value" style="color: ${call.generalKeyPoints.followUpRequired ? "#B45309" : "#707684"};">
            ${call.generalKeyPoints.followUpRequired ? `Yes ${call.generalKeyPoints.followUpDateTime ? `(${escapeHtml(call.generalKeyPoints.followUpDateTime)})` : ""}` : "No"}
          </div>
        </div>
      </div>
    </div>

    <!-- Purpose-Specific Key Points -->
    <div class="card">
      <div class="section-title">Purpose-Specific Extracted Key Points (${escapeHtml(call.callingPurpose)})</div>
      <div class="grid-2">
        ${purposeFieldsHtml || '<div class="field-item"><div class="field-value">No purpose-specific schema defined. General key points apply.</div></div>'}
      </div>
    </div>

    <!-- General Structured Extraction -->
    <div class="card">
      <div class="section-title">General Conversation Intelligence</div>
      <div class="field-item" style="margin-bottom: 12px;">
        <div class="field-label">Executive Summary</div>
        <div class="field-value" style="font-weight: 500; font-size: 13px;">${escapeHtml(call.summary)}</div>
      </div>
      <div class="grid-2" style="margin-top: 10px;">
        <div class="field-item">
          <div class="field-label">Main Questions Asked by Contact</div>
          <ul style="margin: 6px 0 0 16px; padding: 0; font-size: 12.5px; color: #283A50;">
            ${mainQuestionsHtml}
          </ul>
        </div>
        <div class="field-item">
          <div class="field-label">Contact's Needs & Interests</div>
          <ul style="margin: 6px 0 0 16px; padding: 0; font-size: 12.5px; color: #283A50;">
            ${customerNeedsHtml}
          </ul>
        </div>
      </div>
      <div class="grid-2" style="margin-top: 12px;">
        <div class="field-item">
          <div class="field-label">Agreed Actions & Commitments</div>
          <ul style="margin: 6px 0 0 16px; padding: 0; font-size: 12.5px; color: #283A50;">
            ${agreedActionsHtml}
          </ul>
        </div>
        <div class="field-item">
          <div class="field-label">Internal Team Notes</div>
          <div class="field-value" style="font-weight: 500;">${escapeHtml(call.generalKeyPoints.notesForHumanTeam || "None recorded.")}</div>
        </div>
      </div>
    </div>
  `;

  openPrintWindow(`Key Points - ${call.id} - ${call.contactName}`, html);
}

/**
 * 2. Download Individual Key Points as Excel (.csv / .xlsx compatible)
 */
export function downloadIndividualKeyPointsExcel(call: CallIntelligenceRecord) {
  const headers = [
    "Call ID",
    "Contact Name",
    "Phone Number",
    "Calling Purpose",
    "Campaign",
    "Call Type",
    "Agent",
    "Language",
    "Call Date",
    "Duration",
    "Lifecycle Status",
    "Conversation Outcome",
    "Extracted Field",
    "Extracted Value",
    "Is User-Edited",
    "Follow-up Required",
    "Follow-up Date/Time",
    "Executive Summary",
    "Notes for Human Team",
  ];

  const rows: string[][] = [];

  if (call.purposeSpecificFields && call.purposeSpecificFields.length > 0) {
    call.purposeSpecificFields.forEach((f) => {
      rows.push([
        call.id,
        call.contactName,
        call.contactPhone,
        call.callingPurpose,
        call.campaignName,
        call.callType,
        call.agentName,
        call.language,
        `${call.date} ${call.timestamp}`,
        call.duration,
        call.lifecycleStatus,
        call.conversationOutcome,
        f.label,
        f.value || "Not mentioned",
        f.isEdited ? "Yes" : "No",
        call.generalKeyPoints.followUpRequired ? "Yes" : "No",
        call.generalKeyPoints.followUpDateTime || "Not scheduled",
        call.summary,
        call.generalKeyPoints.notesForHumanTeam || "",
      ]);
    });
  } else {
    rows.push([
      call.id,
      call.contactName,
      call.contactPhone,
      call.callingPurpose,
      call.campaignName,
      call.callType,
      call.agentName,
      call.language,
      `${call.date} ${call.timestamp}`,
      call.duration,
      call.lifecycleStatus,
      call.conversationOutcome,
      "General Summary",
      call.summary,
      "No",
      call.generalKeyPoints.followUpRequired ? "Yes" : "No",
      call.generalKeyPoints.followUpDateTime || "Not scheduled",
      call.summary,
      call.generalKeyPoints.notesForHumanTeam || "",
    ]);
  }

  const csvContent =
    "\uFEFF" +
    [headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(",")]
      .concat(
        rows.map((r) =>
          r.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(",")
        )
      )
      .join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `key-points-${call.id}-${call.contactName.replace(/\s+/g, "_")}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 3. Download Individual Key Points as Word (.doc)
 */
export function downloadIndividualKeyPointsDoc(call: CallIntelligenceRecord) {
  const fieldsRows = call.purposeSpecificFields
    .map(
      (f) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold; width: 35%;">${escapeHtml(f.label)}</td>
        <td style="padding: 8px; border: 1px solid #ccc;">${escapeHtml(f.value || "Not mentioned")}${f.isEdited ? " (Edited by user)" : ""}</td>
      </tr>
    `
    )
    .join("");

  const docHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>Key Points - ${escapeHtml(call.id)}</title>
      <style>
        body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #283A50; }
        h1 { color: #283A50; font-size: 16pt; border-bottom: 2px solid #283A50; padding-bottom: 4px; }
        h2 { color: #283A50; font-size: 13pt; margin-top: 14pt; }
        table { width: 100%; border-collapse: collapse; margin-top: 8pt; }
      </style>
    </head>
    <body>
      <h1>Swaram Call Intelligence — Key Points Dossier</h1>
      <p>
        <strong>Call ID:</strong> ${escapeHtml(call.id)}<br/>
        <strong>Calling Purpose:</strong> ${escapeHtml(call.callingPurpose)}<br/>
        <strong>Campaign:</strong> ${escapeHtml(call.campaignName)}<br/>
        <strong>Contact:</strong> ${escapeHtml(call.contactName)} (${escapeHtml(call.contactPhone)})<br/>
        <strong>Agent:</strong> ${escapeHtml(call.agentName)} | <strong>Language:</strong> ${escapeHtml(call.language)}<br/>
        <strong>Date & Time:</strong> ${escapeHtml(call.date)} ${escapeHtml(call.timestamp)} (${escapeHtml(call.duration)})<br/>
        <strong>Execution Status:</strong> ${escapeHtml(call.lifecycleStatus)} | <strong>Conversation Outcome:</strong> ${escapeHtml(call.conversationOutcome)}<br/>
      </p>

      <h2>Purpose-Specific Extracted Key Points</h2>
      <table>
        ${fieldsRows}
      </table>

      <h2>Executive Conversation Summary</h2>
      <p>${escapeHtml(call.summary)}</p>

      <h2>Agreed Actions & Follow-up</h2>
      <p>
        <strong>Follow-up Required:</strong> ${call.generalKeyPoints.followUpRequired ? "Yes" : "No"}<br/>
        <strong>Scheduled Follow-up:</strong> ${escapeHtml(call.generalKeyPoints.followUpDateTime || "Not scheduled")}<br/>
        <strong>Notes for Team:</strong> ${escapeHtml(call.generalKeyPoints.notesForHumanTeam || "None")}<br/>
      </p>
    </body>
    </html>
  `;

  const blob = new Blob(["\uFEFF" + docHtml], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `key-points-${call.id}-${call.contactName.replace(/\s+/g, "_")}.doc`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 4. Download Individual Transcript as PDF
 */
export function downloadIndividualTranscriptPdf(call: CallIntelligenceRecord) {
  if (call.transcriptStatus === "unavailable" || call.transcript.length === 0) {
    alert("This call does not have an available transcript to download.");
    return;
  }

  const turnsHtml = call.transcript
    .map(
      (t) => `
      <div class="transcript-bubble ${t.speaker === "agent" ? "bubble-agent" : "bubble-caller"}">
        <div class="speaker-name">
          ${t.speaker === "agent" ? "🤖 AI Agent" : "👤 Contact"} (${escapeHtml(t.speakerName)})
          <span class="turn-time">${escapeHtml(t.time)}</span>
        </div>
        <div class="turn-text">${escapeHtml(t.text)}</div>
      </div>
    `
    )
    .join("");

  const html = `
    <div class="header-bar">
      <div>
        <span class="brand-badge">Swaram Speech Transcripts</span>
        <h1>Call Transcript: ${escapeHtml(call.contactName)}</h1>
        <div class="meta-line">
          Purpose: <strong>${escapeHtml(call.callingPurpose)}</strong> • Campaign: <strong>${escapeHtml(call.campaignName)}</strong> • ID: <code>${escapeHtml(call.id)}</code>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="badge-status status-${call.lifecycleStatus}">${escapeHtml(call.lifecycleStatus.toUpperCase())}</span>
        <div style="font-size: 11px; color: #707684; margin-top: 6px;">
          Generated: ${new Date().toLocaleDateString()}
        </div>
      </div>
    </div>

    <!-- Metadata Card -->
    <div class="card">
      <div class="grid-3">
        <div class="field-item">
          <div class="field-label">Contact Details</div>
          <div class="field-value">${escapeHtml(call.contactName)} (${escapeHtml(call.contactPhone)})</div>
        </div>
        <div class="field-item">
          <div class="field-label">AI Agent & Language</div>
          <div class="field-value">${escapeHtml(call.agentName)} (${escapeHtml(call.language)})</div>
        </div>
        <div class="field-item">
          <div class="field-label">Date & Duration</div>
          <div class="field-value">${escapeHtml(call.date)} ${escapeHtml(call.timestamp)} • ${escapeHtml(call.duration)}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Call Type</div>
          <div class="field-value" style="text-transform: capitalize;">${escapeHtml(call.callType)} Call</div>
        </div>
        <div class="field-item">
          <div class="field-label">Execution Status</div>
          <div class="field-value">${escapeHtml(call.lifecycleStatus)}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Conversation Outcome</div>
          <div class="field-value" style="color: #2E8066;">${escapeHtml(call.conversationOutcome)}</div>
        </div>
      </div>
    </div>

    <!-- Full Dialogue -->
    <div class="card">
      <div class="section-title">Complete Verified Conversation Transcript (${call.transcript.length} Turns)</div>
      ${call.transcriptStatus === "partial" ? '<div style="background:#FEF3C7; color:#92400E; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;"><strong>Note:</strong> This transcript was flagged as partial due to call network interruption.</div>' : ""}
      <div>
        ${turnsHtml}
      </div>
    </div>
  `;

  openPrintWindow(`Transcript - ${call.id} - ${call.contactName}`, html);
}

/**
 * 5. Download Bulk Key Points as Combined Excel (.csv)
 */
export function downloadBulkKeyPointsExcel(calls: CallIntelligenceRecord[], groupTitle: string = "All Calls") {
  if (calls.length === 0) {
    alert("No calls selected for export.");
    return;
  }

  const headers = [
    "Call ID",
    "Contact Name",
    "Phone Number",
    "Calling Purpose",
    "Campaign",
    "Call Type",
    "Agent Name",
    "Language",
    "Date & Time",
    "Duration",
    "Execution Status",
    "Conversation Outcome",
    "Extracted Field",
    "Extracted Value",
    "User Edited",
    "Follow-up Required",
    "Follow-up Date/Time",
    "Call Summary",
    "Internal Notes",
  ];

  const rows: string[][] = [];

  calls.forEach((call) => {
    if (call.purposeSpecificFields && call.purposeSpecificFields.length > 0) {
      call.purposeSpecificFields.forEach((f) => {
        rows.push([
          call.id,
          call.contactName,
          call.contactPhone,
          call.callingPurpose,
          call.campaignName,
          call.callType,
          call.agentName,
          call.language,
          `${call.date} ${call.timestamp}`,
          call.duration,
          call.lifecycleStatus,
          call.conversationOutcome,
          f.label,
          f.value || "Not mentioned",
          f.isEdited ? "Yes" : "No",
          call.generalKeyPoints.followUpRequired ? "Yes" : "No",
          call.generalKeyPoints.followUpDateTime || "Not scheduled",
          call.summary,
          call.generalKeyPoints.notesForHumanTeam || "",
        ]);
      });
    } else {
      rows.push([
        call.id,
        call.contactName,
        call.contactPhone,
        call.callingPurpose,
        call.campaignName,
        call.callType,
        call.agentName,
        call.language,
        `${call.date} ${call.timestamp}`,
        call.duration,
        call.lifecycleStatus,
        call.conversationOutcome,
        "General Summary",
        call.summary,
        "No",
        call.generalKeyPoints.followUpRequired ? "Yes" : "No",
        call.generalKeyPoints.followUpDateTime || "Not scheduled",
        call.summary,
        call.generalKeyPoints.notesForHumanTeam || "",
      ]);
    }
  });

  const csvContent =
    "\uFEFF" +
    [headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(",")]
      .concat(
        rows.map((r) =>
          r.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(",")
        )
      )
      .join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `bulk-key-points-${groupTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 6. Download Bulk Key Points as Single Combined PDF Report
 */
export function downloadBulkKeyPointsPdf(calls: CallIntelligenceRecord[], groupTitle: string = "All Calls") {
  if (calls.length === 0) {
    alert("No calls selected for export.");
    return;
  }

  // Cover Page & Status Breakdown
  const totalCompleted = calls.filter((c) => c.lifecycleStatus === "completed").length;
  const totalInProgress = calls.filter((c) => c.lifecycleStatus === "in-progress").length;
  const totalQueued = calls.filter((c) => c.lifecycleStatus === "queued" || c.lifecycleStatus === "scheduled").length;
  const totalFailed = calls.filter((c) => c.lifecycleStatus === "failed" || c.lifecycleStatus === "no-answer").length;

  const tableOfContentsRows = calls
    .map(
      (c, index) => `
      <tr>
        <td style="font-family: monospace; font-weight: bold;">${index + 1}. ${escapeHtml(c.id)}</td>
        <td><strong>${escapeHtml(c.contactName)}</strong> (${escapeHtml(c.contactPhone)})</td>
        <td>${escapeHtml(c.callingPurpose)}</td>
        <td><span class="badge-status status-${c.lifecycleStatus}">${escapeHtml(c.lifecycleStatus)}</span></td>
        <td>${escapeHtml(c.conversationOutcome)}</td>
        <td>${c.generalKeyPoints.followUpRequired ? '<span style="color:#B45309;font-weight:bold;">Yes</span>' : "No"}</td>
      </tr>
    `
    )
    .join("");

  const callSections = calls
    .map((call, index) => {
      const purposeFieldsHtml = call.purposeSpecificFields
        .map(
          (f) => `
          <div class="field-item">
            <div class="field-label">${escapeHtml(f.label)}${f.isEdited ? ' <span style="color:#B45309;font-size:9px;">(User-Edited)</span>' : ""}</div>
            <div class="field-value">${escapeHtml(f.value || "Not mentioned")}</div>
          </div>
        `
        )
        .join("");

      return `
        <div class="page-break">
          <div class="header-bar">
            <div>
              <span class="brand-badge">Call Record #${index + 1} of ${calls.length}</span>
              <h1>${escapeHtml(call.contactName)} — ${escapeHtml(call.callingPurpose)}</h1>
              <div class="meta-line">
                Campaign: <strong>${escapeHtml(call.campaignName)}</strong> • ID: <code>${escapeHtml(call.id)}</code> • Date: ${escapeHtml(call.date)} ${escapeHtml(call.timestamp)}
              </div>
            </div>
            <div style="text-align: right;">
              <span class="badge-status status-${call.lifecycleStatus}">${escapeHtml(call.lifecycleStatus.toUpperCase())}</span>
              <div style="font-size: 11px; color: #2E8066; font-weight: 700; margin-top: 4px;">
                ${escapeHtml(call.conversationOutcome)}
              </div>
            </div>
          </div>

          <div class="card">
            <div class="grid-3">
              <div class="field-item">
                <div class="field-label">Contact Details</div>
                <div class="field-value">${escapeHtml(call.contactName)} (${escapeHtml(call.contactPhone)})</div>
              </div>
              <div class="field-item">
                <div class="field-label">AI Agent & Language</div>
                <div class="field-value">${escapeHtml(call.agentName)} (${escapeHtml(call.language)})</div>
              </div>
              <div class="field-item">
                <div class="field-label">Duration & Type</div>
                <div class="field-value">${escapeHtml(call.duration)} • ${escapeHtml(call.callType)}</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="section-title">Purpose-Specific Extracted Key Points</div>
            <div class="grid-2">
              ${purposeFieldsHtml || '<div class="field-item"><div class="field-value">General key points apply.</div></div>'}
            </div>
          </div>

          <div class="card">
            <div class="section-title">Conversation Summary & Agreed Actions</div>
            <div class="field-item" style="margin-bottom: 10px;">
              <div class="field-label">Executive Summary</div>
              <div class="field-value" style="font-weight: 500;">${escapeHtml(call.summary)}</div>
            </div>
            <div class="grid-2">
              <div class="field-item">
                <div class="field-label">Follow-up Required</div>
                <div class="field-value" style="color: ${call.generalKeyPoints.followUpRequired ? "#B45309" : "#707684"}; font-weight: 700;">
                  ${call.generalKeyPoints.followUpRequired ? `Yes ${call.generalKeyPoints.followUpDateTime ? `(${escapeHtml(call.generalKeyPoints.followUpDateTime)})` : ""}` : "No follow-up needed"}
                </div>
              </div>
              <div class="field-item">
                <div class="field-label">Notes for Human Team</div>
                <div class="field-value">${escapeHtml(call.generalKeyPoints.notesForHumanTeam || "None recorded.")}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const html = `
    <!-- Cover Page -->
    <div class="header-bar" style="border-bottom: 3px solid #283A50; padding-bottom: 24px;">
      <div>
        <span class="brand-badge">Swaram AI Workforce Intelligence</span>
        <h1 style="font-size: 24px;">Purpose-Based Call Intelligence Master Report</h1>
        <div class="meta-line" style="font-size: 13px; margin-top: 4px;">
          Scope: <strong>${escapeHtml(groupTitle)}</strong> • Generated: <strong>${new Date().toLocaleDateString()}</strong> • Exported Records: <strong>${calls.length}</strong>
        </div>
      </div>
      <div style="text-align: right; font-size: 11px; color: #707684;">
        Platform: Swaram Telephony<br/>
        Audit Status: 100% Grounded
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="card">
      <div class="section-title">Batch Execution Summary</div>
      <div class="grid-3">
        <div class="field-item">
          <div class="field-label">Total Calls Selected</div>
          <div class="field-value" style="font-size: 18px;">${calls.length}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Completed Calls</div>
          <div class="field-value" style="color: #2E8066; font-size: 18px;">${totalCompleted}</div>
        </div>
        <div class="field-item">
          <div class="field-label">In Progress / Active</div>
          <div class="field-value" style="color: #3730A3; font-size: 18px;">${totalInProgress}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Queued / Scheduled</div>
          <div class="field-value" style="color: #92400E; font-size: 18px;">${totalQueued}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Failed / No Answer</div>
          <div class="field-value" style="color: #991B1B; font-size: 18px;">${totalFailed}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Completion Rate</div>
          <div class="field-value" style="font-size: 18px;">
            ${calls.length > 0 ? Math.round((totalCompleted / calls.length) * 100) : 0}%
          </div>
        </div>
      </div>
    </div>

    <!-- Call Index / Table of Contents -->
    <div class="card">
      <div class="section-title">Included Calls Index</div>
      <table class="toc-table">
        <thead>
          <tr>
            <th>Call ID</th>
            <th>Contact Name & Phone</th>
            <th>Calling Purpose</th>
            <th>Status</th>
            <th>Outcome</th>
            <th>Follow-up</th>
          </tr>
        </thead>
        <tbody>
          ${tableOfContentsRows}
        </tbody>
      </table>
    </div>

    <!-- Call Sections -->
    ${callSections}
  `;

  openPrintWindow(`Key Points Report - ${groupTitle}`, html);
}

/**
 * 7. Download Bulk Transcripts as ONE Single Combined PDF
 */
export function downloadBulkTranscriptsPdf(calls: CallIntelligenceRecord[], groupTitle: string = "All Selected Calls") {
  if (calls.length === 0) {
    alert("No calls selected for export.");
    return;
  }

  const eligibleCalls = calls.filter((c) => c.transcriptStatus !== "unavailable" && c.transcript.length > 0);
  const excludedCalls = calls.filter((c) => c.transcriptStatus === "unavailable" || c.transcript.length === 0);

  if (eligibleCalls.length === 0) {
    alert("None of the selected calls have available speech transcripts to export.");
    return;
  }

  // Cover Page Index
  const callIndexRows = eligibleCalls
    .map(
      (c, idx) => `
      <tr>
        <td style="font-family: monospace; font-weight: bold;">Section ${idx + 1} (${escapeHtml(c.id)})</td>
        <td><strong>${escapeHtml(c.contactName)}</strong> (${escapeHtml(c.contactPhone)})</td>
        <td>${escapeHtml(c.callingPurpose)}</td>
        <td>${escapeHtml(c.duration)}</td>
        <td>${escapeHtml(c.agentName)}</td>
        <td><span class="badge-status status-${c.lifecycleStatus}">${escapeHtml(c.lifecycleStatus)}</span></td>
        <td>${c.transcript.length} turns</td>
      </tr>
    `
    )
    .join("");

  const excludedRows = excludedCalls
    .map(
      (c) => `
      <tr>
        <td style="font-family: monospace;">${escapeHtml(c.id)}</td>
        <td>${escapeHtml(c.contactName)}</td>
        <td>${escapeHtml(c.lifecycleStatus)}</td>
        <td>${c.lifecycleStatus === "queued" ? "Call queued — not yet dialed" : "No transcript audio recorded"}</td>
      </tr>
    `
    )
    .join("");

  // Sections
  const sectionsHtml = eligibleCalls
    .map((call, index) => {
      const turnsHtml = call.transcript
        .map(
          (t) => `
          <div class="transcript-bubble ${t.speaker === "agent" ? "bubble-agent" : "bubble-caller"}">
            <div class="speaker-name">
              ${t.speaker === "agent" ? "🤖 AI Agent" : "👤 Contact"} (${escapeHtml(t.speakerName)})
              <span class="turn-time">${escapeHtml(t.time)}</span>
            </div>
            <div class="turn-text">${escapeHtml(t.text)}</div>
          </div>
        `
        )
        .join("");

      return `
        <div class="page-break">
          <div class="header-bar">
            <div>
              <span class="brand-badge">Section ${index + 1} of ${eligibleCalls.length} • Speech Transcript</span>
              <h1>${escapeHtml(call.contactName)} — ${escapeHtml(call.callingPurpose)}</h1>
              <div class="meta-line">
                Campaign: <strong>${escapeHtml(call.campaignName)}</strong> • ID: <code>${escapeHtml(call.id)}</code> • Agent: <strong>${escapeHtml(call.agentName)}</strong> (${escapeHtml(call.language)})
              </div>
            </div>
            <div style="text-align: right;">
              <span class="badge-status status-${call.lifecycleStatus}">${escapeHtml(call.lifecycleStatus.toUpperCase())}</span>
              <div style="font-size: 11px; color: #707684; margin-top: 4px;">
                ${escapeHtml(call.date)} ${escapeHtml(call.timestamp)} • ${escapeHtml(call.duration)}
              </div>
            </div>
          </div>

          <div class="card" style="margin-bottom: 14px;">
            <div class="grid-3">
              <div class="field-item">
                <div class="field-label">Contact Details</div>
                <div class="field-value">${escapeHtml(call.contactName)} (${escapeHtml(call.contactPhone)})</div>
              </div>
              <div class="field-item">
                <div class="field-label">Execution Status</div>
                <div class="field-value">${escapeHtml(call.lifecycleStatus)}</div>
              </div>
              <div class="field-item">
                <div class="field-label">Conversation Outcome</div>
                <div class="field-value" style="color: #2E8066;">${escapeHtml(call.conversationOutcome)}</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="section-title">Verbatim Dialogue Transcript (${call.transcript.length} Turns)</div>
            ${call.transcriptStatus === "partial" ? '<div style="background:#FEF3C7; color:#92400E; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;"><strong>Note:</strong> Partial transcript due to network disconnect.</div>' : ""}
            <div>
              ${turnsHtml}
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const html = `
    <!-- Cover Page -->
    <div class="header-bar" style="border-bottom: 3px solid #283A50; padding-bottom: 24px;">
      <div>
        <span class="brand-badge">Swaram Telephony Intelligence</span>
        <h1 style="font-size: 24px;">Combined Call Transcripts Compilation</h1>
        <div class="meta-line" style="font-size: 13px; margin-top: 4px;">
          Group / Campaign: <strong>${escapeHtml(groupTitle)}</strong> • Generated: <strong>${new Date().toLocaleDateString()}</strong>
        </div>
      </div>
      <div style="text-align: right; font-size: 11px; color: #707684;">
        Platform: Swaram AI Autonomous Telephony<br/>
        Format: Combined Single PDF Document
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="card">
      <div class="section-title">Compilation Summary</div>
      <div class="grid-3">
        <div class="field-item">
          <div class="field-label">Total Calls Selected</div>
          <div class="field-value" style="font-size: 18px;">${calls.length}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Transcripts Included</div>
          <div class="field-value" style="color: #2E8066; font-size: 18px;">${eligibleCalls.length}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Calls Excluded (No Transcript)</div>
          <div class="field-value" style="color: ${excludedCalls.length > 0 ? "#991B1B" : "#707684"}; font-size: 18px;">
            ${excludedCalls.length}
          </div>
        </div>
      </div>
    </div>

    <!-- Call Index -->
    <div class="card">
      <div class="section-title">Included Transcripts Index (Table of Contents)</div>
      <table class="toc-table">
        <thead>
          <tr>
            <th>Section & ID</th>
            <th>Contact Name & Phone</th>
            <th>Calling Purpose</th>
            <th>Duration</th>
            <th>Agent</th>
            <th>Status</th>
            <th>Turns</th>
          </tr>
        </thead>
        <tbody>
          ${callIndexRows}
        </tbody>
      </table>
    </div>

    <!-- Excluded Summary If Any -->
    ${
      excludedCalls.length > 0
        ? `
      <div class="card" style="border-color: #FECACA; background: #FEF2F2;">
        <div class="section-title" style="color: #991B1B; border-color: #FECACA;">Excluded Calls from Compilation (${excludedCalls.length})</div>
        <p style="font-size: 12px; color: #7F1D1D; margin: 0 0 10px 0;">
          The following calls were selected but excluded from this PDF transcript compilation because no transcript has been generated (e.g. call is still queued, failed before answer, or unanswered).
        </p>
        <table class="toc-table" style="background: white;">
          <thead>
            <tr>
              <th>Call ID</th>
              <th>Contact Name</th>
              <th>Lifecycle Status</th>
              <th>Exclusion Reason</th>
            </tr>
          </thead>
          <tbody>
            ${excludedRows}
          </tbody>
        </table>
      </div>
    `
        : ""
    }

    <!-- Call Sections -->
    ${sectionsHtml}
  `;

  openPrintWindow(`Transcripts - ${groupTitle}`, html);
}
