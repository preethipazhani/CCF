export const LESSONS_DATA = [
  {
    id: "phishing-1",
    category: "Phishing",
    categorySlug: "phishing",
    title: "Recognizing Email Phishing & Spoofed Domains",
    subtitle: "Learn how hackers craft deceptive emails to steal your credentials and sensitive data.",
    icon: "🎣",
    readTime: "5 min read",
    xpReward: 100,
    difficulty: "Beginner",
    badgeReward: "phishing_scout",
    overview: "Phishing is one of the most common cyber threats facing organizations worldwide. Attackers masquerade as trusted entities—such as banks, corporate IT departments, or popular cloud platforms—to deceive users into clicking malicious links or revealing credentials.",
    keyTakeaways: [
      "Check the sender's full email address, not just the display name.",
      "Hover over links before clicking to inspect the real URL destination.",
      "Be wary of urgent language, threats, or unsolicited file attachments.",
      "Verify unexpected requests out-of-band via trusted channels."
    ],
    sections: [
      {
        heading: "1. Common Red Flags in Phishing Emails",
        content: `Phishers rely on psychological triggers like urgency, fear, and curiosity to trick targets into taking immediate action without thinking.

Key indicators of a phishing email include:
• **Mismatched Sender Domains**: The display name says "PayPal Support" but the actual email address is \`support@paypa1-security-check.com\`.
• **Urgent & Threatening Tone**: Claims that your account will be permanently suspended within 24 hours unless you log in.
• **Generic Greetings**: Salutations like "Dear Customer" or "Valued User" instead of your actual name.
• **Deceptive Hyperlinks**: Text links showing a legitimate web domain, but hover previews show an unfamiliar IP address or sub-domain.
• **Unexpected Attachments**: Zip archives, macro-enabled Word documents (\`.docm\`), or disguised HTML files.`
      },
      {
        heading: "2. Real-World Case Study: Spear Phishing Attacks",
        content: `Spear phishing targets specific individuals using personalized intelligence gathered from social media profiles, public company records, or leaked databases.

In a landmark corporate compromise, attackers impersonated a company CEO during a busy holiday period, emailing an finance employee to request an urgent wire transfer to an unknown vendor. Because the email domain used a lookalike character ("rn" instead of "m"), the transfer was authorized before security teams caught the fraud.`
      },
      {
        heading: "3. Best Practices & Incident Response",
        content: `If you suspect an email is malicious:
1. **Do NOT click any links** or open attachments.
2. **Report the email** using your organization's "Report Phishing" button.
3. **Notify Security/IT** if you accidentally entered credentials or downloaded a file.
4. **Change your passwords** immediately from a clean device.`
      }
    ],
    warningChecklist: [
      "Is the email asking for password or verification code?",
      "Does the domain name contain spelling errors (typosquatting)?",
      "Is there a sense of artificial urgency requiring immediate action?",
      "Is the attachment ending in .exe, .scr, .vbs, or .iso?"
    ]
  },

  {
    id: "passwords-1",
    category: "Password Security",
    categorySlug: "password-security",
    title: "Mastering Strong Passwords & Multi-Factor Auth (MFA)",
    subtitle: "Discover passphrase techniques and why MFA is your strongest line of defense.",
    icon: "🔑",
    readTime: "6 min read",
    xpReward: 100,
    difficulty: "Beginner",
    badgeReward: "password_guardian",
    overview: "Weak, reused passwords are responsible for over 80% of corporate data breaches. Relying on simple passwords leaves your accounts vulnerable to automated brute-force, credential stuffing, and dictionary attacks.",
    keyTakeaways: [
      "Use long passphrases (16+ characters) combining random words.",
      "Never reuse the same password across multiple accounts or platforms.",
      "Utilize a reputable dedicated Password Manager.",
      "Enable Multi-Factor Authentication (MFA) with authenticator apps over SMS."
    ],
    sections: [
      {
        heading: "1. The Anatomy of a Weak Password",
        content: `Standard password rules (like 8 characters with 1 number) are no longer sufficient against modern high-speed GPU cracking tools.

Common password mistakes include:
• **Short Length**: An 8-character password can be cracked in minutes using dictionary lists.
• **Personal Info**: Dates of birth, names of pets, or sports teams found on public social profiles.
• **Common Substitutions**: Replacing 'e' with '3' or 'a' with '@' (e.g., P@ssw0rd123) is already indexed in attacker wordlists.
• **Cross-Site Reuse**: Reusing a password across 10 accounts means one breached site compromises all 10.`
      },
      {
        heading: "2. The Passphrase Strategy & Password Managers",
        content: `A **Passphrase** uses 4 or more random words linked together (e.g., \`Purple-Octopus-Coffee-Sailing!\`). Passphrases are easier to remember for humans but exponential orders of magnitude harder for computers to crack.

**Password Managers** (like Bitwarden, 1Password, KeePass) generate unique 20-character passwords for every site, store them securely encrypted, and auto-fill credentials safely.`
      },
      {
        heading: "3. Multi-Factor Authentication (MFA) Hierarchy",
        content: `MFA adds an extra verification step beyond passwords:
1. **Something You Know**: Password / PIN
2. **Something You Have**: Authenticator App (TOTP), Hardware Security Key (YubiKey)
3. **Something You Are**: Biometric fingerprint / FaceID

*Security Tip*: Hardware keys and TOTP Authenticator Apps (Google Auth, Microsoft Auth) are significantly safer than SMS codes, which are vulnerable to SIM swapping attacks.`
      }
    ],
    warningChecklist: [
      "Are any of your accounts sharing the exact same password?",
      "Is your primary email account protected by MFA?",
      "Are you using SMS authentication instead of an Authenticator App?",
      "Have you stored passwords in cleartext text files on your desktop?"
    ]
  },

  {
    id: "malware-1",
    category: "Malware",
    categorySlug: "malware",
    title: "Malware, Viruses & Ransomware Threat Prevention",
    subtitle: "Understand how malicious software spreads and how to keep systems isolated and secure.",
    icon: "🛡️",
    readTime: "7 min read",
    xpReward: 100,
    difficulty: "Intermediate",
    badgeReward: "malware_defender",
    overview: "Malware (Malicious Software) encompasses viruses, ransomware, spyware, trojans, and keyloggers designed to gain unauthorized access, sabotage computer networks, or extort money from victim organizations.",
    keyTakeaways: [
      "Keep operating systems, web browsers, and applications updated automatically.",
      "Never plug untrusted USB drives into work or personal computers.",
      "Maintain offline, encrypted backups to neutralize Ransomware attacks.",
      "Use endpoint protection (EDR/Antivirus) with real-time file scanning."
    ],
    sections: [
      {
        heading: "1. Types of Malware Explained",
        content: `• **Ransomware**: Encrypts files on your hard drive and demands payment (usually cryptocurrency) for the decryption key.
• **Trojans**: Disguises itself as legitimate software (e.g., a PDF reader or crack utility) to gain silent backdoor access.
• **Keyloggers**: Silently captures every keystroke you type, recording login credentials and credit card numbers.
• **Spyware**: Secretly monitors browsing habits, camera feeds, or confidential documents.`
      },
      {
        heading: "2. Vector Control: How Malware Spreads",
        content: `Malware infects devices through several primary delivery mechanisms:
• Drive-by downloads from compromised or malicious websites.
• Malicious email attachments (.exe, .zip, macro scripts).
• Software pirating and torrent downloads containing embedded trojans.
• Unattended external media (USB drop attacks in office parking lots).`
      },
      {
        heading: "3. Ransomware Defense Protocol",
        content: `The gold standard for ransomware protection is the **3-2-1 Backup Strategy**:
• **3** copies of your critical data.
• **2** different storage media types (e.g., local SSD + cloud storage).
• **1** copy stored **offline / air-gapped** from the network.`
      }
    ],
    warningChecklist: [
      "Are your OS and applications set to install security updates automatically?",
      "Do you have a recent offline backup of important files?",
      "Is your antivirus software active with up-to-date signature databases?",
      "Are software downloads restricted to verified, official app stores?"
    ]
  },

  {
    id: "social-1",
    category: "Social Engineering",
    categorySlug: "social-engineering",
    title: "Social Engineering & Human Vishing Tactics",
    subtitle: "Learn how manipulators exploit human psychology, trust, and authority to bypass firewalls.",
    icon: "🧠",
    readTime: "6 min read",
    xpReward: 100,
    difficulty: "Intermediate",
    badgeReward: "social_engineer_shield",
    overview: "Social Engineering is the art of manipulating people into performing actions or divulging confidential information. Unlike technical attacks, it targets human psychology—curiosity, fear, authority, and helpfulness.",
    keyTakeaways: [
      "Always verify caller identities when asked for sensitive organizational data.",
      "Beware of Vishing (Voice Phishing) impersonating IT Helpdesks or Banks.",
      "Never allow unauthorized individuals to 'tailgate' through secure physical doors.",
      "Practice healthy skepticism when strangers ask for quick access or favors."
    ],
    sections: [
      {
        heading: "1. The 6 Principles of Influence Exploited by Attackers",
        content: `Attackers leverage psychological triggers identified by Robert Cialdini:
1. **Authority**: Posing as a company executive, auditor, or law enforcement official.
2. **Urgency**: Creating panic by claiming a deadline or emergency.
3. **Scarcity**: Offering limited-time security updates or rewards.
4. **Social Proof**: Claiming "Everyone in your department has already verified their info."
5. **Likability / Rapport**: Chatting friendly to gain trust before asking for help.
6. **Reciprocity**: Offering a minor favor in exchange for internal information.`
      },
      {
        heading: "2. Vishing & Smishing Techniques",
        content: `• **Vishing (Voice Phishing)**: Phone calls where the caller spoofs caller ID and pretends to be IT support asking you to approve a 2FA push notification.
• **Smishing (SMS Phishing)**: Text messages alerting you to an undelivered package or bank hold with a short tracking link.`
      },
      {
        heading: "3. Physical Social Engineering & Tailgating",
        content: `Social engineering isn't purely digital. **Tailgating** occurs when an unauthorized person follows an employee through a secure door by holding heavy boxes or pretending to have forgotten their badge. Always politely direct visitors to the receptionist.`
      }
    ],
    warningChecklist: [
      "Did someone over the phone ask you to read back a 2FA verification code?",
      "Is an unknown person asking you to hold open a restricted door badge entrance?",
      "Did an caller ask for your login password to perform 'routine system maintenance'?",
      "Are you feeling pressured to bypass official procedure to help a caller?"
    ]
  },

  {
    id: "network-1",
    category: "Network Security",
    categorySlug: "network-security",
    title: "Securing Wi-Fi Networks & VPN Tunneling",
    subtitle: "Protect data in transit across public Wi-Fi, firewalls, and encrypted tunnels.",
    icon: "🌐",
    readTime: "6 min read",
    xpReward: 120,
    difficulty: "Intermediate",
    badgeReward: "speed_demon",
    overview: "Network security consists of policies and practices adopted to prevent and monitor unauthorized access, misuse, modification, or denial of a computer network and network-accessible resources.",
    keyTakeaways: [
      "Avoid logging into sensitive accounts on open unencrypted public Wi-Fi.",
      "Use an encrypted VPN (Virtual Private Network) on remote untrusted connections.",
      "Ensure corporate routers use WPA3 wireless encryption with strong WPA keys.",
      "Keep Next-Generation Firewalls (NGFW) active to monitor inbound/outbound packets."
    ],
    sections: [
      {
        heading: "1. Public Wi-Fi Risks & Man-in-the-Middle (MITM) Attacks",
        content: `Unencrypted Wi-Fi hotspots in airports, cafes, and hotels expose network traffic to eavesdropping:
• **Eavesdropping / Packet Sniffing**: Unencrypted HTTP traffic can be intercepted by anyone on the same network using tools like Wireshark.
• **Rogue Hotspots (Evil Twin)**: Attackers set up an open Wi-Fi network named "Free_Airport_WiFi" to intercept all user credentials entering the router.`
      },
      {
        heading: "2. The Role of Virtual Private Networks (VPNs)",
        content: `A **VPN** creates an encrypted tunnel between your device and a secure remote server. Even if you connect to an insecure public network, all data flowing through the VPN tunnel is encrypted end-to-end using AES-256 standards, rendering sniffed traffic useless to hackers.`
      }
    ],
    warningChecklist: [
      "Is your connection using HTTPS with a valid SSL padlock icon?",
      "Is your VPN active while working from coffee shops or airports?",
      "Is your home router using WPA2-Enterprise or WPA3 encryption?"
    ]
  },

  {
    id: "privacy-1",
    category: "Data Privacy",
    categorySlug: "data-privacy",
    title: "Data Protection, PII & Privacy Regulations",
    subtitle: "Master Personally Identifiable Information (PII) safeguards and compliance.",
    icon: "🔒",
    readTime: "5 min read",
    xpReward: 120,
    difficulty: "Advanced",
    badgeReward: "password_guardian",
    overview: "Data privacy focuses on the proper handling, collecting, processing, and storing of sensitive personal data in compliance with privacy regulations like GDPR, CCPA, and HIPAA.",
    keyTakeaways: [
      "Identify Personally Identifiable Information (PII) such as SSNs, financial records, and medical data.",
      "Apply Data Minimization: Only collect and store personal data strictly necessary for legitimate operations.",
      "Enforce Data Classification (Public, Internal, Confidential, Restricted).",
      "Safely shred or cryptographically wipe retired storage drives."
    ],
    sections: [
      {
        heading: "1. Understanding PII & Sensitive Data",
        content: `**PII (Personally Identifiable Information)** refers to any data that could potentially identify a specific individual:
• Full Name, Social Security Number (SSN), Passport Number.
• IP Address, Device Identifiers, Biometric Records.
• Credit Card numbers, bank routing information, and health history.`
      },
      {
        heading: "2. Privacy Principles & Encryption at Rest",
        content: `Organizations must safeguard data at rest using AES-256 disk encryption, role-based access control (RBAC), and explicit data retention limits to minimize compliance exposure during data breaches.`
      }
    ],
    warningChecklist: [
      "Are confidential customer spreadsheets encrypted before emailing?",
      "Are old hard drives wiped using DoD 5220.22-M sanitization standards?",
      "Is access to sensitive databases limited to authorized employees only?"
    ]
  }
];
