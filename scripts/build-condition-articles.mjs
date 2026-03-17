import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const bundlePath = path.join(rootDir, "assets", "index-BOA5E3cS.js");

const MANUAL_ARTICLES = {
  "failed-back-surgical-syndrome": {
    title: "About Ashburn and Herndon Failed Back Surgical Syndrome and Ashburn and Herndon Chiropractic Care",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Failed Back Surgical Syndrome describes the frustrating situation in which a patient undergoes spine surgery hoping to relieve pain, yet continues to have back pain, leg pain, or recurrent symptoms afterward. The reference site frames this as pain that may still respond to a conservative, non-surgical approach even after surgery.</p>
<p><strong>Definition</strong></p>
<p>Pain that persists or returns after spinal surgery that was intended to reduce back or leg symptoms.</p>
<p><strong>Description</strong></p>
<p>The source material explains that surgery changes the mechanical behavior of the spine. Even when a procedure is technically successful, surrounding tissues, adjacent discs, joints, and nerves may remain irritated or may become stressed over time. That ongoing irritation can leave a patient with persistent pain, recurrent pain, stiffness, or nerve-related symptoms.</p>
<p>On the reference site, this condition is closely related to persistent post-surgical pain and post-surgical continued pain. In practical terms, the concern is not just the surgery itself, but the altered stress on the nearby spinal structures after surgery.</p>
<p><strong>What patients may notice</strong></p>
<ul>
  <li>Low back pain that never fully settled after surgery.</li>
  <li>Pain that improved at first and later returned.</li>
  <li>Leg pain, buttock pain, or nerve pain that continues despite the operation.</li>
  <li>Stiffness, limited mobility, and sensitivity around the surgical region.</li>
</ul>
<p><strong>Examination</strong></p>
<p>A careful examination is important after prior spine surgery because treatment has to work around the surgical history, the current mechanics of the spine, and any ongoing neurological findings. Imaging and a detailed review of the prior surgical area may be part of that process.</p>
<p><strong>Treatment Approach</strong></p>
<p>The Poulin reference pages consistently describe Cox Technic Flexion Distraction and Decompression as a gentle, conservative option designed to lower intradiscal pressure, improve canal and foraminal space, and reduce irritation of spinal tissues. For post-surgical patients, the goal is to calm pain generators without adding another invasive procedure.</p>
<p>The emphasis is on working conservatively and safely around the surgical region while trying to improve comfort, tolerance for daily activity, and overall quality of life.</p>
<p><strong>Why conservative care is considered</strong></p>
<p>The low back pain research page on the same site notes that surgery is not always more beneficial than intensive rehabilitation and that second opinions frequently question whether further surgery is required. That makes conservative care especially relevant when symptoms remain after an operation.</p>
<p><strong>At-Home Considerations</strong></p>
<ul>
  <li>Avoid positions and activities that repeatedly flare the surgical area.</li>
  <li>Follow movement and support recommendations carefully.</li>
  <li>Use a gradual, structured recovery plan rather than pushing through sharp pain.</li>
  <li>Support spinal mechanics with posture, walking tolerance, and doctor-guided exercise.</li>
</ul>
<p><strong>Summary</strong></p>
<p>Failed Back Surgical Syndrome does not automatically mean another surgery is the next step. The reference site’s message is that a gentle, conservative chiropractic decompression approach may still help reduce pain and improve daily function after back surgery.</p>
`,
  },
  "post-surgical-continued-pain": {
    title: "Ashburn and Herndon Post-Surgical Continued Pain",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Post-Surgical Continued Pain refers to back pain or leg pain that remains after surgery. The reference page notes that this problem was once often called Failed Back Surgical Syndrome, and the central message is that continued pain after surgery may still respond to conservative chiropractic spinal manipulation.</p>
<p><strong>Definition</strong></p>
<p>Ongoing spinal pain or related nerve pain that continues after a spine operation.</p>
<p><strong>Description</strong></p>
<p>Even after surgery, the spine still has to manage motion, load, and nerve tension. The reference site presents post-surgical continued pain as a condition in which the original pain never fully resolved or new mechanical stress developed at the surgical level or nearby segments.</p>
<p>Changes in disc behavior, joint irritation, scar-related sensitivity, or stress on adjacent segments may all contribute to continued pain. This is why a patient may still feel back pain, leg pain, or a sense that the surgical area is not functioning normally.</p>
<p><strong>Typical complaints</strong></p>
<ul>
  <li>Low back pain that persists after recovery time.</li>
  <li>Leg symptoms that continue or return.</li>
  <li>Pain around the surgical region with movement or prolonged positions.</li>
  <li>Difficulty returning to normal activity despite the operation.</li>
</ul>
<p><strong>Examination</strong></p>
<p>A complete clinical examination is important because the post-surgical spine has to be evaluated differently than a spine that has never been operated on. Prior procedures, current symptoms, neurological findings, and movement tolerance all matter.</p>
<p><strong>Treatment</strong></p>
<p>The reference site’s broader treatment language around post-surgical pain emphasizes a conservative approach. Cox Technic Flexion Distraction and Decompression is described across the site as a gentle way to reduce pressure inside the disc, improve space for irritated tissues, and work around painful spinal mechanics without more surgery.</p>
<p>Treatment planning is typically geared toward reducing irritation first and then improving how well the patient moves and functions day to day.</p>
<p><strong>Why this matters</strong></p>
<p>The source material repeatedly supports the idea that continued pain after surgery does not necessarily mean that more surgery is the only answer. Conservative care remains an important option for people trying to regain comfort and mobility.</p>
<p><strong>At-Home Focus</strong></p>
<ul>
  <li>Respect pain triggers instead of repeatedly provoking them.</li>
  <li>Use supported sitting, standing, and sleeping positions.</li>
  <li>Progress activity steadily rather than aggressively.</li>
  <li>Stay consistent with the plan designed for the post-surgical spine.</li>
</ul>
<p><strong>Summary</strong></p>
<p>Post-Surgical Continued Pain is the modern language for a problem many patients know all too well: the pain did not end with surgery. This local article keeps the same message as the reference site: conservative, non-surgical care may still help.</p>
`,
  },
  "interstitial-cystitis": {
    title: "Interstitial Cystitis",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Interstitial cystitis can be life-disrupting because it affects bladder comfort, pelvic pain, and daily quality of life. On the Poulin reference site, it appears as one of the viscerosomatic conditions that may relate to irritated spinal nerve pathways.</p>
<p><strong>Definition</strong></p>
<p>A chronic bladder pain condition often associated with pelvic discomfort, pressure, and urinary symptoms.</p>
<p><strong>Description</strong></p>
<p>The reference site links interstitial cystitis to viscerosomatic patterns, meaning that irritation involving the spine and its nerve supply may influence symptoms experienced in the pelvic organs. A cited note on the site explains that decompression of the L5 nerve root has been discussed as a way to relieve interstitial cystitis pain, supporting interest in non-surgical decompression approaches.</p>
<p>The goal is not to oversimplify the condition, but to recognize that for some patients there may be a spinal component contributing to the pain experience.</p>
<p><strong>What symptoms can feel like</strong></p>
<ul>
  <li>Pelvic pain or bladder-region discomfort.</li>
  <li>Pressure, urgency, or irritation that disrupts routine life.</li>
  <li>Symptoms that are difficult to explain or that persist despite other care.</li>
</ul>
<p><strong>Examination</strong></p>
<p>A thorough examination is important to determine whether spinal mechanics, especially in the lumbar and sacral regions, may be part of the symptom pattern. The reference site treats these cases as conditions that deserve careful assessment rather than assumptions.</p>
<p><strong>Treatment</strong></p>
<p>The broader Poulin/ Cox Technic material describes flexion distraction and decompression as a gentle, non-surgical way to reduce nerve irritation and improve space around affected structures. In the context of interstitial cystitis, the site presents this as a possible conservative contribution to pain relief when spinal nerve irritation is involved.</p>
<p><strong>Why conservative care is considered</strong></p>
<p>Because interstitial cystitis is often persistent and complex, the value of a conservative option is that it may help address the spinal component without adding more invasive stress. The reference content positions this as part of a multidisciplinary, thoughtful approach.</p>
<p><strong>At-Home Considerations</strong></p>
<ul>
  <li>Pay attention to positions or activities that increase pelvic irritation.</li>
  <li>Support low back and pelvic mechanics during sitting and daily tasks.</li>
  <li>Follow a gradual plan designed to reduce rather than provoke symptoms.</li>
</ul>
<p><strong>Summary</strong></p>
<p>On the reference site, interstitial cystitis is treated as a real and challenging condition that may have a spine-related component in some patients. This article keeps that same idea and presents it fully inside your site.</p>
`,
  },
  "irritable-bowel-syndrome": {
    title: "Irritable Bowel Syndrome",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Irritable Bowel Syndrome affects the large intestine and can interfere with comfort, routine, and confidence in day-to-day life. On the reference site, IBS is included among the viscerosomatic conditions that may be influenced by the spinal nerves supplying the bowel.</p>
<p><strong>Definition</strong></p>
<p>A functional bowel disorder commonly associated with abdominal discomfort, bloating, gas, diarrhea, constipation, or alternating bowel changes.</p>
<p><strong>Description</strong></p>
<p>The source site explains that the lumbar and sacral nerves supplying the large intestine and colon may be relevant in IBS cases. It notes that spinal manipulation of the low back has often been associated with relief and presents Cox Technic’s decompression-based approach as a gentle means of reducing nerve irritation.</p>
<p>This does not mean IBS is “only a back problem.” The idea is that spinal mechanics may be one meaningful factor in some patients’ symptom picture.</p>
<p><strong>Common symptoms</strong></p>
<ul>
  <li>Cramping or abdominal pain.</li>
  <li>Bloating and gas.</li>
  <li>Diarrhea, constipation, or an alternation of both.</li>
  <li>Symptoms that flare with stress, posture, or daily strain.</li>
</ul>
<p><strong>Examination</strong></p>
<p>A careful examination can help determine whether the lumbar or sacral spine may be contributing to irritation through mechanical stress or nerve involvement. The reference material encourages evaluation rather than guesswork.</p>
<p><strong>Treatment</strong></p>
<p>Poulin’s educational content describes Cox Technic Flexion Distraction and Decompression as a gentle way to reduce pressure, open spinal spaces, and calm irritated tissues. In IBS-related discussion, that decompression concept is presented as one conservative factor that may help patients whose symptoms have a spinal component.</p>
<p><strong>Why a conservative approach matters</strong></p>
<p>IBS can be difficult because symptoms are real, recurring, and not always solved quickly. A non-surgical approach that respects the nerve supply to the bowel offers another path to explore when appropriate.</p>
<p><strong>At-Home Focus</strong></p>
<ul>
  <li>Notice whether sitting, posture, or low back irritation changes symptoms.</li>
  <li>Support lumbar and sacral comfort during daily activity.</li>
  <li>Stay steady with the treatment plan instead of chasing short-term flare cycles.</li>
</ul>
<p><strong>Summary</strong></p>
<p>The reference site presents IBS as one of the conditions that may improve when spinal irritation is reduced. This version keeps that article local and fully readable inside your site.</p>
`,
  },
  "pelvic-pain": {
    title: "Pelvic Pain and Organic Dysfunction",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Pelvic pain can be especially difficult because it may involve pain, organ-related symptoms, and a long path to finding answers. On the reference site, this topic is discussed in the context of Pelvic Pain and Organic Dysfunction, a viscerosomatic presentation connected to spinal mechanics.</p>
<p><strong>Definition</strong></p>
<p>Pelvic pain and associated functional disturbance involving pelvic organs, sometimes connected with an underlying mechanical disorder of the spine.</p>
<p><strong>Description</strong></p>
<p>The Poulin educational material references the work of Dr. James Browning on Pelvic Pain and Organic Dysfunction syndrome. It explains that this syndrome can involve chronic pelvic pain together with changes in bladder, bowel, gynecologic, or sexual function. The clinical picture can vary widely from patient to patient.</p>
<p>According to the reference content, the spine may play a role because nerve pathways from the spinal region help regulate pelvic structures. When those mechanical relationships are disturbed, pain and functional symptoms may follow.</p>
<p><strong>What patients may experience</strong></p>
<ul>
  <li>Chronic pelvic pain.</li>
  <li>Rectal or genital-area discomfort.</li>
  <li>Bladder or bowel disturbances.</li>
  <li>Gynecologic or sexual function complaints.</li>
  <li>A symptom pattern that feels broad, variable, or difficult to explain.</li>
</ul>
<p><strong>Examination</strong></p>
<p>The reference site treats these complaints seriously and emphasizes the importance of evaluating the spine as part of the full picture. A detailed examination can help determine whether the low back and pelvic mechanics are contributing to the symptoms.</p>
<p><strong>Treatment</strong></p>
<p>Cox Technic Flexion Distraction and Decompression is presented throughout the site as a gentle, non-surgical way to reduce nerve irritation and improve spinal mechanics. In pelvic pain and organic dysfunction cases, that conservative decompression approach is described as a way to address the underlying spinal contribution where appropriate.</p>
<p><strong>Why this approach matters</strong></p>
<p>Pelvic pain conditions are often complex and frequently misunderstood. The reference content is valuable because it gives these symptoms a structured spine-related framework and offers a conservative treatment path rather than dismissing the problem.</p>
<p><strong>At-Home Focus</strong></p>
<ul>
  <li>Reduce repetitive positions that aggravate the low back or pelvis.</li>
  <li>Pay attention to spinal posture during sitting and activity.</li>
  <li>Work steadily through a conservative care plan built around symptom control.</li>
</ul>
<p><strong>Summary</strong></p>
<p>Pelvic Pain and Organic Dysfunction is presented on the source site as a legitimate, multifaceted condition that may involve the spine and its nerve supply. This full local article keeps that information inside your website for visitors to read without leaving.</p>
`,
  },
  "sprain-strain": {
    title: "About Ashburn and Herndon Chiropractic and Ashburn and Herndon Sprain/Strain",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Sprain and strain injuries often start with one awkward moment: a lift, a twist, a fall, a collision, or a sudden movement that the tissues of the spine were not ready to absorb. The Poulin reference content frames this as the familiar story of a back, neck, or mid-back injury that suddenly makes ordinary movement feel difficult.</p>
<p><strong>Definition</strong></p>
<p>Muscle and soft-tissue tearing or overstretch injury commonly associated with lifting, vehicle accidents, falls, and sudden mechanical stress.</p>
<p><strong>Description</strong></p>
<p>On the source site, sprain and strain are described as injuries that can affect any part of the spine. Muscles, tendons, and supporting ligaments can become irritated or torn, leading to protective spasm, pain, stiffness, and an inability to tolerate normal activity.</p>
<p>Because these soft tissues help stabilize the spine, the pain can feel surprisingly intense even when the injury began with what seemed like a simple movement. A patient may struggle to stand upright, bend, walk normally, or turn without triggering another sharp flare.</p>
<p><strong>Where it can happen</strong></p>
<ul>
  <li>Cervical spine or neck sprain/strain.</li>
  <li>Thoracic spine or mid-back sprain/strain.</li>
  <li>Lumbar spine or low back sprain/strain.</li>
</ul>
<p><strong>Common symptoms</strong></p>
<ul>
  <li>Sharp or pulling pain with movement.</li>
  <li>Muscle tightness or guarding.</li>
  <li>Difficulty bending, walking, or standing upright.</li>
  <li>Pain after lifting, pushing, twisting, or impact.</li>
</ul>
<p><strong>Examination</strong></p>
<p>A focused examination helps determine whether the injury is limited to soft tissue or whether disc, joint, or nerve irritation is also part of the presentation. That distinction matters because a sprain/strain can coexist with other spinal problems after a sudden injury.</p>
<p><strong>Treatment</strong></p>
<p>Across the Poulin site, conservative chiropractic care is positioned as a way to calm irritated tissues, improve mechanics, and help the spine recover without unnecessary force. Cox Technic Flexion Distraction and Decompression is presented as a gentle approach that may help reduce stress on the painful region while mobility is gradually restored.</p>
<p><strong>At-Home Focus</strong></p>
<ul>
  <li>Avoid repeating the motion that triggered the injury.</li>
  <li>Use supported positions and careful activity modification while pain is acute.</li>
  <li>Return to movement gradually instead of forcing through sharp pain.</li>
  <li>Follow home-care instructions aimed at settling inflammation and restoring motion.</li>
</ul>
<p><strong>Summary</strong></p>
<p>Sprain and strain injuries are common, but they can still be very limiting. This full local article keeps the original message intact: the injury may involve more than sore muscles alone, and a careful conservative approach can help the spine settle and recover.</p>
`,
  },
  "degenerative-disc-disease": {
    title: "About Ashburn and Herndon Degenerative Disc Disease",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Degenerative disc disease is a common finding on spine imaging, but not everyone with degeneration has pain. The Poulin reference content makes that point clearly: some people live with disc thinning without symptoms, while others experience pain, stiffness, and activity limitation that lead them to seek care.</p>
<p><strong>Definition</strong></p>
<p>Degeneration or thinning of the intervertebral disc, the cartilaginous pad between the vertebrae of the spine.</p>
<p><strong>Description</strong></p>
<p>The source site explains that as a disc degenerates, it loses height and resilience. That thinning can narrow available spinal space, irritate nearby facet joints, and contribute to spur formation on the vertebrae. Over time, those mechanical changes may create a painful spinal environment even when the degeneration itself develops gradually.</p>
<p>Degenerative disc disease may appear in one area of the spine or in multiple regions at once. The reference content notes that if disc degeneration is present in one region, it is often seen in another as well.</p>
<p><strong>Where it can occur</strong></p>
<ul>
  <li>Cervical spine disc degeneration.</li>
  <li>Thoracic spine disc degeneration.</li>
  <li>Lumbar spine disc degeneration.</li>
</ul>
<p><strong>What patients may notice</strong></p>
<ul>
  <li>Stiffness after rest or sitting.</li>
  <li>Localized spine pain or aching.</li>
  <li>Pain related to activity, posture, or repetitive stress.</li>
  <li>Episodes that flare when disc and joint irritation increase together.</li>
</ul>
<p><strong>Examination</strong></p>
<p>A thorough examination, and often imaging, helps determine how much of the patient’s pain is related to the degenerative disc itself and how much is coming from surrounding structures such as joints, nerves, or adjacent tissues. That full picture matters because degeneration is often only one piece of the problem.</p>
<p><strong>Treatment</strong></p>
<p>The Poulin reference page presents Cox Technic Flexion Distraction and Decompression as a gentle, conservative option for patients dealing with degenerative disc disease. The broader site language describes this approach as one that can reduce mechanical pressure, improve space, and support better spinal movement while symptoms settle.</p>
<p><strong>At-Home Considerations</strong></p>
<ul>
  <li>Limit positions that repeatedly compress the painful area.</li>
  <li>Use supportive sitting and sleeping arrangements.</li>
  <li>Stay consistent with exercises and movement guidance for the involved spinal region.</li>
  <li>Respect flare patterns rather than pushing through them.</li>
</ul>
<p><strong>Summary</strong></p>
<p>Degenerative disc disease is not just an x-ray term when it becomes painful. This local full article keeps the source site’s message intact: conservative decompression-based care may help when disc thinning and related spinal stress are contributing to symptoms.</p>
`,
  },
  "coccydynia-tailbone-pain": {
    title: "Poulin Chiropractic of Herndon and Ashburn Explains the Coccygeal Spine",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Tailbone pain can make very ordinary things feel miserable, especially sitting, leaning back, or rising from a chair. The Poulin reference material explains the coccygeal spine in practical terms and describes how injuries to the coccyx can create surprisingly severe and persistent pain.</p>
<p><strong>Definition</strong></p>
<p>Coccydynia is pain involving the coccyx or tailbone at the very bottom of the spine.</p>
<p><strong>Description</strong></p>
<p>The source site explains that the coccyx is made up of two to four vertebrae at the base of the spine. Whether those segments are fully fused or not, muscles, tendons, and ligaments attach there, which helps explain why irritation in this region can be so uncomfortable.</p>
<p>The coccyx may be injured by a backward fall, hard sitting, or childbirth. When that happens, the pain can become persistent because the area is involved in so many everyday postures and transitions.</p>
<p><strong>Common coccygeal issues</strong></p>
<ul>
  <li>Tailbone pain after a fall.</li>
  <li>Pain after prolonged hard sitting.</li>
  <li>Pain associated with childbirth or pelvic strain.</li>
  <li>Coccygodynia with localized tenderness and pressure intolerance.</li>
</ul>
<p><strong>Examination</strong></p>
<p>A careful examination helps determine whether the pain is limited to the coccyx itself or whether nearby lumbar, sacral, disc, and soft-tissue structures are also involved. The reference content treats coccygeal pain as a legitimate spine complaint rather than a minor nuisance.</p>
<p><strong>Treatment</strong></p>
<p>The Poulin reference page notes that treatment may include ice, co-management strategies, supportive sitting, and a specialized form of spinal manipulation for coccygeal pain. It also points out that disc injury has been discussed in connection with falls or trauma to this area, which helps explain why care may extend beyond the tailbone alone.</p>
<p>Across the broader site, the treatment philosophy remains conservative: reduce irritation, improve mechanics, and support recovery without pushing the area too aggressively.</p>
<p><strong>At-Home Focus</strong></p>
<ul>
  <li>Modify sitting to reduce direct pressure on the tailbone.</li>
  <li>Avoid repeated impact or hard-surface sitting while the area is aggravated.</li>
  <li>Use positioning and support recommendations consistently.</li>
  <li>Pay attention to low back and sacral mechanics, not just the coccyx alone.</li>
</ul>
<p><strong>Summary</strong></p>
<p>Coccydynia and tailbone pain can linger and disrupt daily life more than people expect. This full local article preserves the source site’s message that the coccygeal spine deserves focused, conservative care and thoughtful evaluation.</p>
`,
  },
  "sacroiliac-joint-dysfunction": {
    title: "About Ashburn and Herndon Chiropractic and Ashburn and Herndon Sacroiliac Joint Pain",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Sacroiliac joint pain often gets described as low back pain, hip pain, buttock pain, or even groin pain, which is one reason it can be confusing for patients. The Poulin reference content identifies the sacroiliac joints as a real source of radiating pain when they become irritated or misaligned.</p>
<p><strong>Definition</strong></p>
<p>Pain radiating from the sacroiliac joints.</p>
<p><strong>Description</strong></p>
<p>The source site explains that sacroiliac joint pain comes from inflammation or irritation of the SI joints, often associated with misalignment and nerve interference. The pain may be a deep ache or a sharper pain that interferes with standing, moving, or bearing weight comfortably.</p>
<p>Because the SI joints sit at the transition between the spine and pelvis, symptoms may spread into the buttocks, hips, or groin and may be mistaken for another low back problem unless the area is examined carefully.</p>
<p><strong>Common symptoms</strong></p>
<ul>
  <li>Low back pain on one or both sides.</li>
  <li>Deep buttock pain.</li>
  <li>Hip or groin referral.</li>
  <li>Pain that worsens with standing, walking, or certain transitions.</li>
</ul>
<p><strong>Examination</strong></p>
<p>A thorough clinical examination, and at times imaging, helps determine whether the sacroiliac joints are the main pain generator or whether disc, lumbar, or pelvic structures are contributing alongside them. The reference page stresses the importance of this diagnostic step.</p>
<p><strong>Treatment</strong></p>
<p>The Poulin source describes chiropractic adjusting as a way to relieve sacroiliac joint pain and notes that adjunctive in-office care may help recovery. In the broader language of the site, treatment is aimed at restoring better mechanics, reducing irritation, and helping the patient tolerate movement more comfortably.</p>
<p><strong>At-Home Care</strong></p>
<ul>
  <li>Avoid prolonged sitting or other positions that aggravate the pelvis.</li>
  <li>Use a support brace if recommended.</li>
  <li>Sleep on a supportive mattress and sit in an ergonomically supportive chair.</li>
  <li>Modify daily activity while the joints calm down.</li>
</ul>
<p><strong>Summary</strong></p>
<p>Sacroiliac joint dysfunction can mimic other spine and hip complaints, but it has its own mechanical pattern and treatment needs. This expanded local article keeps the original message available in full inside your site.</p>
`,
  },
  "myelopathy": {
    title: "About Ashburn and Herndon Cervical Myelopathy",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Cervical myelopathy is a more serious spine condition because it involves the spinal cord itself rather than only a single irritated nerve root. The Poulin reference content presents it as a functional or pathological change in the spinal cord that deserves a thorough examination and careful co-management.</p>
<p><strong>Definition</strong></p>
<p>Myelopathy is a functional or pathological change in the spinal cord itself, resulting in nerve damage.</p>
<p><strong>Description</strong></p>
<p>On the source site, cervical myelopathy is described as a late-stage consequence of cervical disc disease and spinal degeneration. As disc and joint changes progress, the spinal cord may become compressed or irritated, producing more global neurological symptoms than a typical neck pain complaint.</p>
<p>Because the spinal cord helps carry signals to the arms, hands, trunk, and legs, myelopathy can affect coordination, strength, dexterity, walking tolerance, balance, and fine motor control. This is one reason the condition is treated with extra caution.</p>
<p><strong>What patients may notice</strong></p>
<ul>
  <li>Neck pain or stiffness together with arm or hand symptoms.</li>
  <li>Clumsiness in the hands or reduced grip coordination.</li>
  <li>Changes in walking, balance, or leg control.</li>
  <li>Numbness, weakness, or unusual neurological findings that feel broader than a single pinched nerve.</li>
</ul>
<p><strong>Examination</strong></p>
<p>The reference page emphasizes a thorough clinical examination that may include imaging. That is especially important with myelopathy because the provider has to distinguish spinal cord involvement from a more routine disc or nerve-root presentation and determine whether co-management or referral is appropriate.</p>
<p><strong>Treatment</strong></p>
<p>The source material notes that co-management is common. Across the Poulin educational pages, the broader treatment goal of Cox Technic Flexion Distraction and Decompression is to reduce mechanical irritation, improve spinal motion where appropriate, and support function with a conservative, gentle approach.</p>
<p>For myelopathy, the key idea is not aggressive manipulation. It is thoughtful management built around neurological findings, imaging, patient safety, and the degree of spinal cord involvement.</p>
<p><strong>Clinical focus</strong></p>
<p>The reference content highlights case material involving discogenic cervical myelopathy and post-surgical situations with spondylotic myelopathy. That reinforces the message that myelopathy can appear in both degenerative and previously treated cervical spine cases.</p>
<p><strong>At-Home Considerations</strong></p>
<ul>
  <li>Do not ignore worsening coordination, weakness, or balance changes.</li>
  <li>Avoid self-forcing neck movements that provoke neurological symptoms.</li>
  <li>Follow imaging, referral, and co-management recommendations closely.</li>
  <li>Use a conservative plan focused on safety and function.</li>
</ul>
<p><strong>Summary</strong></p>
<p>Cervical myelopathy is more than routine neck pain. The Poulin reference message is that it requires a careful examination, appropriate co-management, and a conservative approach tailored to spinal cord involvement rather than a one-size-fits-all treatment model.</p>
`,
  },
  "subluxation": {
    title: "About Ashburn and Herndon Chiropractic and Ashburn and Herndon Subluxation",
    contentHtml: `
<p><strong>Introduction</strong></p>
<p>Subluxation is one of those terms patients hear often, but it is not always explained clearly. On the Poulin reference site, it is presented as a vertebral misalignment that creates abnormal motion and irritation in the structures of the spine.</p>
<p><strong>Definition</strong></p>
<p>A misalignment of one vertebra upon the other.</p>
<p><strong>Description</strong></p>
<p>The source content explains that a subluxation results in abnormal mobility of the spine and irritation of the disc, facet joints, and surrounding soft tissues. When a spinal segment is not moving or positioning normally, the nearby tissues can become stressed and painful.</p>
<p>This matters because the irritation is not limited to one structure. A subluxation can affect the disc, the small spinal joints, local muscles, and supporting ligaments, which is why symptoms may range from localized stiffness to broader spinal pain patterns.</p>
<p><strong>Where it can happen</strong></p>
<p>The reference page notes that subluxation may be found in any area of the spine:</p>
<ul>
  <li>Cervical spine or neck.</li>
  <li>Thoracic spine or mid-back.</li>
  <li>Lumbar spine or low back.</li>
</ul>
<p><strong>Common symptoms</strong></p>
<ul>
  <li>Localized spinal pain.</li>
  <li>Restricted movement or stiffness.</li>
  <li>Irritation that worsens with certain positions or activities.</li>
  <li>Protective muscle tension around the involved segment.</li>
</ul>
<p><strong>Examination</strong></p>
<p>A focused examination helps determine which spinal region is involved, how the segment is moving, and whether disc, joint, or nerve irritation is also present. Since subluxation can appear in the neck, mid-back, or low back, the clinical evaluation guides which area deserves attention.</p>
<p><strong>Treatment</strong></p>
<p>Across the Poulin educational site, chiropractic care is framed around restoring healthier motion, reducing mechanical irritation, and calming pain generators in the spine. Cox Technic Flexion Distraction and Decompression is the featured conservative method used to lower disc pressure and improve the spinal environment without harsh force.</p>
<p>When subluxation is part of the presentation, the goal is to reduce abnormal stress on the spinal segment and help the patient move more comfortably in daily life.</p>
<p><strong>At-Home Focus</strong></p>
<ul>
  <li>Avoid repetitive positions that keep irritating the same spinal region.</li>
  <li>Support posture and movement habits that reduce strain.</li>
  <li>Stay consistent with exercises or home instructions designed for the involved area.</li>
</ul>
<p><strong>Summary</strong></p>
<p>Subluxation, as presented on the reference site, is a mechanical spinal problem involving abnormal vertebral motion and tissue irritation. This local full article keeps that explanation available directly inside your site instead of leaving visitors with a short fragment.</p>
`,
  },
};

function readSources() {
  const source = fs.readFileSync(bundlePath, "utf8");
  const match = source.match(/const TL=\[(.*?)\],PL=/s);

  if (!match) {
    throw new Error("Could not find TL condition list in bundle");
  }

  return Function(`return [${match[1]}];`)();
}

function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&#174;/g, "®")
    .replace(/&reg;/g, "®")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripAttributes(html) {
  return html.replace(/\s+(?:class|style|align|target|rel|mce_real_href|width|height|webkitallowfullscreen|mozallowfullscreen|allowfullscreen|face|size)="[^"]*"/g, "");
}

function stripUnsupportedTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/<font[^>]*>/gi, "")
    .replace(/<\/font>/gi, "");
}

function normalizeLinks(html) {
  return html.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1");
}

function normalizeMarkup(html) {
  return html
    .replace(/<div class="section-subsection-head cufon">\s*(.*?)\s*<\/div>/gi, "<h2>$1</h2>")
    .replace(/<span style="font-size: 14pt;text-transform:uppercase;">\s*([\s\S]*?)\s*<\/span>/gi, "<h2>$1</h2>")
    .replace(/<span style="font-size: 14pt;">\s*([\s\S]*?)\s*<\/span>/gi, "<h2>$1</h2>")
    .replace(/<strong style="font-size: 14pt;">\s*([\s\S]*?)\s*<\/strong>/gi, "<h2>$1</h2>")
    .replace(/<em style="text-align: -webkit-center; font-size: 10pt;">[\s\S]*?<\/em>/gi, "")
    .replace(/<div>\s*&nbsp;\s*<\/div>/gi, "")
    .replace(/<p>\s*&nbsp;\s*<\/p>/gi, "")
    .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, "</p><p>")
    .replace(/<(div|section)>/gi, "<p>")
    .replace(/<\/(div|section)>/gi, "</p>");
}

function cleanupHtml(html) {
  return html
    .replace(/\r/g, "")
    .replace(/\n+/g, "\n")
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/<p>\s*(<h2>)/gi, "$1")
    .replace(/(<\/h2>)\s*<\/p>/gi, "$1")
    .replace(/<p>\s*(<ul>|<ol>)/gi, "$1")
    .replace(/(<\/ul>|<\/ol>)\s*<\/p>/gi, "$1")
    .replace(/<p>\s*(<li>)/gi, "$1")
    .replace(/(<\/li>)\s*<\/p>/gi, "$1")
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/<p>\s+/gi, "<p>")
    .replace(/\s+<\/p>/gi, "</p>")
    .trim();
}

function extractTitle(html) {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? decodeEntities(match[1].replace(/<[^>]+>/g, "").trim()) : "";
}

function extractArticleHtml(html) {
  const startMarker =
    '<div class="main__content main__content--pages main__content--detail main__content--pages--detail ">';
  const endMarker = '<div class="main__component main__component--colsp10';
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker, startIndex);

  if (startIndex === -1 || endIndex === -1) {
    return "";
  }

  const article = decodeEntities(
    cleanupHtml(
      normalizeMarkup(
        normalizeLinks(
          stripAttributes(stripUnsupportedTags(html.slice(startIndex + startMarker.length, endIndex)))
        )
      )
    )
  );

  return article;
}

function buildFallbackArticle(title) {
  return `<p>This condition page is listed on the reference site, but the source page does not currently publish a full article body for <strong>${title}</strong>.</p><p>We kept the condition available locally so the experience stays inside your site without redirecting visitors away.</p>`;
}

function sanitizeArticleHtml(html) {
  return html
    .replace(/<p\b[^>]*>[\s\S]*?<\/p>/gi, (paragraph) =>
      /Contact Poulin Chiropractic/i.test(paragraph) ? "" : paragraph
    )
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    .replace(/<p>\s*<\/p>/gi, "")
    .trim();
}

function buildDataset(rawDir) {
  const sources = readSources();
  const byUrl = new Map();
  const aliases = {};
  const slugByUrl = new Map();

  for (const source of sources) {
    if (!slugByUrl.has(source.url)) {
      slugByUrl.set(source.url, slugify(source.name));
    }
  }

  for (const source of sources) {
    const fileSlug = slugByUrl.get(source.url);
    const htmlPath = path.join(rawDir, `${fileSlug}.html`);

    if (MANUAL_ARTICLES[fileSlug]) {
      const article = MANUAL_ARTICLES[fileSlug];

      if (!byUrl.has(source.url)) {
        byUrl.set(source.url, {
          key: fileSlug,
          url: source.url,
          title: article.title,
          category: source.category,
          contentHtml: article.contentHtml.trim(),
        });
      }

      aliases[source.name] = byUrl.get(source.url).key;
      continue;
    }

    if (!fs.existsSync(htmlPath)) {
      throw new Error(`Missing source html for ${source.name}: ${htmlPath}`);
    }

    const html = fs.readFileSync(htmlPath, "utf8");
    const title = extractTitle(html) || source.name;
    const contentHtml = sanitizeArticleHtml(extractArticleHtml(html) || buildFallbackArticle(title));

    if (!byUrl.has(source.url)) {
      byUrl.set(source.url, {
        key: fileSlug,
        url: source.url,
        title,
        category: source.category,
        contentHtml,
      });
    }

    aliases[source.name] = byUrl.get(source.url).key;
  }

  return {
    generatedAt: new Date().toISOString(),
    aliases,
    articles: Object.fromEntries(
      Array.from(byUrl.values()).map((entry) => [
        entry.key,
        {
          title: entry.title,
          category: entry.category,
          url: entry.url,
          contentHtml: entry.contentHtml,
        },
      ])
    ),
  };
}

function writeOutput(dataset, outputPath) {
  const contents =
    "window.__POULIN_CONDITION_ARTICLES__ = " +
    JSON.stringify(dataset) +
    ";\n";
  fs.writeFileSync(outputPath, contents, "utf8");
}

function printSources() {
  const sources = readSources();
  const uniqueByUrl = new Map();

  for (const source of sources) {
    if (!uniqueByUrl.has(source.url)) {
      uniqueByUrl.set(source.url, {
        name: source.name,
        slug: slugify(source.name),
        category: source.category,
        url: source.url,
      });
    }
  }

  process.stdout.write(JSON.stringify(Array.from(uniqueByUrl.values()), null, 2));
}

const [mode, ...args] = process.argv.slice(2);

if (mode === "print-sources") {
  printSources();
} else if (mode === "build") {
  const [rawDir, outputFile] = args;
  if (!rawDir || !outputFile) {
    throw new Error("Usage: node scripts/build-condition-articles.mjs build <rawDir> <outputFile>");
  }
  writeOutput(buildDataset(rawDir), outputFile);
} else {
  throw new Error("Unknown mode. Use `print-sources` or `build`.");
}
