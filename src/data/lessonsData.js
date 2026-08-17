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
        heading: "Introduction to Phishing",
        content: `Phishing is a type of social engineering attack where cybercriminals send fraudulent communications that appear to come from a reputable source. The goal is usually to steal sensitive data such as login credentials, credit card numbers, or to install malware on the victim's machine. Phishing attacks account for more than 80% of reported security incidents and remain the number one vector for data breaches worldwide.`
      },
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

In a landmark corporate compromise, attackers impersonated a company CEO during a busy holiday period, emailing an finance employee to request an urgent wire transfer to an unknown vendor. Because the email domain used a lookalike character ("rn" instead of "m"), the transfer was authorized before security teams caught the fraud.

Another real-world example: In 2020, a major social media platform was compromised when attackers used spear phishing to gain access to internal admin tools, resulting in the hijacking of high-profile accounts.`
      },
      {
        heading: "3. Warning Signs & Indicators",
        content: `Always watch for these warning signs:
• Emails that create a sense of panic or extreme urgency
• Requests for passwords, PINs, or verification codes via email
• Links that don't match the organization's official domain
• Poor grammar and spelling mistakes in supposedly official communications
• Unexpected password reset notifications you did not request
• Emails from "internal" addresses that arrive from external servers`
      },
      {
        heading: "4. Prevention Techniques & Best Practices",
        content: `If you suspect an email is malicious:
1. **Do NOT click any links** or open attachments.
2. **Report the email** using your organization's "Report Phishing" button.
3. **Notify Security/IT** if you accidentally entered credentials or downloaded a file.
4. **Change your passwords** immediately from a clean device.
5. **Enable Multi-Factor Authentication** on all critical accounts.
6. **Use email filtering tools** that flag external senders and suspicious domains.
7. **Regularly train employees** with simulated phishing exercises.`
      },
      {
        heading: "Summary",
        content: `Phishing remains the most prevalent cyber attack vector. By learning to identify red flags such as mismatched domains, urgent language, and suspicious attachments, you can protect yourself and your organization. Always verify unexpected requests through trusted channels, and report suspicious emails immediately.`
      }
    ],
    warningChecklist: [
      "Is the email asking for password or verification code?",
      "Does the domain name contain spelling errors (typosquatting)?",
      "Is there a sense of artificial urgency requiring immediate action?",
      "Is the attachment ending in .exe, .scr, .vbs, or .iso?"
    ],
    questions: [
      {
        id: "ph-q1",
        type: "mcq",
        question: "You receive an email from 'support@paypa1-security.com' claiming your account is locked. What is the biggest red flag?",
        options: [
          "The email mentions PayPal",
          "The domain 'paypa1' uses the number '1' instead of the letter 'l' — a typosquatting technique",
          "The email was received on a weekend",
          "The email has a PayPal logo"
        ],
        correctAnswer: 1,
        explanation: "Typosquatting replaces letters with similar-looking characters. 'paypa1' uses '1' instead of 'l' to mimic the legitimate domain."
      },
      {
        id: "ph-q2",
        type: "true_false",
        question: "True or False: If a phishing email contains your real name and company position, it is definitely a legitimate email.",
        options: [
          "True — Personalized emails are always safe.",
          "False — Spear phishing uses personal information gathered from social media and public records."
        ],
        correctAnswer: 1,
        explanation: "Spear phishing specifically uses personalized information to make the attack more convincing. Your personal details are often publicly available."
      },
      {
        id: "ph-q3",
        type: "scenario",
        question: "Scenario: You receive an email from your 'CEO' asking you to urgently purchase gift cards and send the codes. The email came from an external address. What should you do?",
        options: [
          "Purchase the gift cards immediately since it's from the CEO",
          "Reply to the email asking for confirmation",
          "Verify the request by calling your CEO directly on their known phone number",
          "Forward the email to your personal account for review"
        ],
        correctAnswer: 2,
        explanation: "CEO fraud / Business Email Compromise (BEC) is a common scam. Always verify unusual requests out-of-band through a known, trusted communication channel."
      },
      {
        id: "ph-q4",
        type: "mcq",
        question: "What is the 'hover technique' used for when examining emails?",
        options: [
          "To enlarge the email text for easier reading",
          "To preview the actual destination URL of a hyperlink before clicking",
          "To check the email's encryption status",
          "To mark the email as important"
        ],
        correctAnswer: 1,
        explanation: "Hovering over hyperlinks reveals the actual destination URL, allowing you to detect if the link leads to a malicious or unexpected domain."
      },
      {
        id: "ph-q5",
        type: "mcq",
        question: "Which of the following is NOT a common phishing indicator?",
        options: [
          "Emails with urgent subject lines demanding immediate action",
          "Emails from a verified internal domain with a digital signature",
          "Emails with generic greetings like 'Dear Customer'",
          "Emails containing unexpected attachments"
        ],
        correctAnswer: 1,
        explanation: "Emails from verified internal domains with valid digital signatures are typically legitimate. The other options are classic phishing indicators."
      }
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
        heading: "Introduction to Password Security",
        content: `Passwords are the most common form of authentication, yet they remain one of the weakest links in cybersecurity. Every year, billions of credentials are exposed in data breaches, and attackers use sophisticated tools to crack weak passwords in seconds. Understanding proper password hygiene is fundamental to protecting your digital identity.`
      },
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
      },
      {
        heading: "4. Real-World Examples",
        content: `• In 2012, LinkedIn suffered a breach exposing 6.5 million password hashes. Many passwords were cracked within hours because users chose simple passwords like "linkedin123".
• The 2016 Yahoo breach affected 3 billion accounts, many of which used reused passwords, allowing attackers to access victims' other services like banking and email.
• Credential stuffing attacks use leaked username/password pairs from one breach to automatically try logging into thousands of other websites.`
      },
      {
        heading: "Summary",
        content: `Strong password security requires long, unique passphrases for every account, managed through a password manager, and reinforced with multi-factor authentication. Never reuse passwords, avoid common substitution patterns, and prefer authenticator apps or hardware keys over SMS-based MFA.`
      }
    ],
    warningChecklist: [
      "Are any of your accounts sharing the exact same password?",
      "Is your primary email account protected by MFA?",
      "Are you using SMS authentication instead of an Authenticator App?",
      "Have you stored passwords in cleartext text files on your desktop?"
    ],
    questions: [
      {
        id: "pw-q1",
        type: "true_false",
        question: "True or False: Using a short 8-character password with a special character (e.g., P@ssw0rd) is safer than a 16-character random passphrase (e.g., Purple-Octopus-Coffee!).",
        options: [
          "True — Special characters prevent all cracking.",
          "False — Length is exponentially more effective than simple character substitutions."
        ],
        correctAnswer: 1,
        explanation: "Modern GPU brute-force crackers easily guess common character substitutions (like @ for a). Passphrase length (16+ chars) provides vastly higher entropy."
      },
      {
        id: "pw-q2",
        type: "mcq",
        question: "Which MFA method is MOST vulnerable to SIM-swapping attacks?",
        options: [
          "Hardware security key (YubiKey)",
          "Authenticator app (Google Auth / Microsoft Auth)",
          "SMS-based one-time codes",
          "Biometric fingerprint scan"
        ],
        correctAnswer: 2,
        explanation: "SMS codes can be intercepted through SIM-swapping attacks where an attacker convinces your mobile carrier to transfer your phone number to their SIM card."
      },
      {
        id: "pw-q3",
        type: "scenario",
        question: "Scenario: You need to create passwords for 15 different online services. What is the most secure approach?",
        options: [
          "Use one strong master password for all 15 services",
          "Write unique passwords on sticky notes attached to your monitor",
          "Use a reputable password manager to generate and store unique 20+ character passwords for each service",
          "Use variations of the same password (MyPassword1, MyPassword2, etc.)"
        ],
        correctAnswer: 2,
        explanation: "A password manager generates unique, strong passwords for every service and stores them in an encrypted vault, eliminating the risk of password reuse."
      },
      {
        id: "pw-q4",
        type: "true_false",
        question: "True or False: Storing your passwords in a dedicated Password Manager is safer than reusing one master password across 20 websites.",
        options: [
          "True — Password Managers store unique 20+ character passwords in an encrypted vault.",
          "False — It is safer to reuse one simple password so you never forget it."
        ],
        correctAnswer: 0,
        explanation: "Cross-site password reuse means a single breach on one website compromises all 20 of your accounts. A password manager eliminates this risk."
      }
    ]
  },

  {
    id: "malware-1",
    category: "Malware",
    categorySlug: "malware",
    title: "Malware, Viruses & Threat Prevention",
    subtitle: "Understand how malicious software spreads and how to keep systems isolated and secure.",
    icon: "🦠",
    readTime: "7 min read",
    xpReward: 100,
    difficulty: "Intermediate",
    badgeReward: "malware_defender",
    overview: "Malware (Malicious Software) encompasses viruses, spyware, trojans, and keyloggers designed to gain unauthorized access, sabotage computer networks, or steal sensitive information from victim organizations.",
    keyTakeaways: [
      "Keep operating systems, web browsers, and applications updated automatically.",
      "Never plug untrusted USB drives into work or personal computers.",
      "Use endpoint protection (EDR/Antivirus) with real-time file scanning.",
      "Download software only from official, verified sources."
    ],
    sections: [
      {
        heading: "Introduction to Malware",
        content: `Malware is any software intentionally designed to cause damage to a computer, server, client, or network. It can steal data, encrypt files, spy on users, or give attackers unauthorized access to systems. Understanding the different types of malware and how they spread is crucial for protecting your digital assets.`
      },
      {
        heading: "1. Types of Malware Explained",
        content: `• **Viruses**: Self-replicating programs that attach to legitimate files and spread when those files are executed.
• **Trojans**: Disguises itself as legitimate software (e.g., a PDF reader or crack utility) to gain silent backdoor access.
• **Worms**: Self-propagating malware that spreads across networks without requiring user interaction.
• **Keyloggers**: Silently captures every keystroke you type, recording login credentials and credit card numbers.
• **Spyware**: Secretly monitors browsing habits, camera feeds, or confidential documents.
• **Rootkits**: Deeply embedded malware that hides from detection by modifying the operating system itself.`
      },
      {
        heading: "2. Vector Control: How Malware Spreads",
        content: `Malware infects devices through several primary delivery mechanisms:
• Drive-by downloads from compromised or malicious websites.
• Malicious email attachments (.exe, .zip, macro scripts).
• Software pirating and torrent downloads containing embedded trojans.
• Unattended external media (USB drop attacks in office parking lots).
• Exploiting unpatched software vulnerabilities (zero-day exploits).
• Malicious advertisements (malvertising) on legitimate websites.`
      },
      {
        heading: "3. Real-World Examples",
        content: `• **Stuxnet (2010)**: A sophisticated worm designed to sabotage Iran's nuclear enrichment facilities by targeting industrial control systems.
• **WannaCry (2017)**: A worm that exploited a Windows vulnerability, infecting over 200,000 computers in 150 countries.
• **Emotet**: Originally a banking trojan, evolved into a major malware distribution platform used to deliver other malware families.`
      },
      {
        heading: "4. Prevention & Best Practices",
        content: `• Keep all software updated with the latest security patches
• Use reputable endpoint detection and response (EDR) solutions
• Never open attachments from unknown or unexpected sources
• Disable macro execution in Microsoft Office documents by default
• Regularly scan systems for vulnerabilities
• Implement application whitelisting to prevent unauthorized software execution
• Segment networks to contain potential infections`
      },
      {
        heading: "Summary",
        content: `Malware comes in many forms and spreads through various vectors. The best defense combines keeping systems updated, using endpoint protection, being cautious with downloads and attachments, and maintaining regular backups. Education and vigilance remain your strongest tools against malware threats.`
      }
    ],
    warningChecklist: [
      "Are your OS and applications set to install security updates automatically?",
      "Do you have a recent offline backup of important files?",
      "Is your antivirus software active with up-to-date signature databases?",
      "Are software downloads restricted to verified, official app stores?"
    ],
    questions: [
      {
        id: "mw-q1",
        type: "scenario",
        question: "Scenario: A coworker leaves an unmarked USB thumb drive on your desk with 'Confidential Salaries' handwritten on it. What should you do?",
        options: [
          "Plug it into your workstation to see who owns it",
          "Turn the USB drive in to your IT/Security team without plugging it into any device",
          "Plug it into your personal home computer instead",
          "Leave it on the desk and post on social media asking whose USB it is"
        ],
        correctAnswer: 1,
        explanation: "USB drop attacks are a classic malware delivery tactic. Plugging unknown USB drives can execute rubber-ducky scripts or silent keyloggers instantly."
      },
      {
        id: "mw-q2",
        type: "mcq",
        question: "Which type of malware disguises itself as legitimate software to gain unauthorized access?",
        options: [
          "Worm",
          "Trojan",
          "Adware",
          "Rootkit"
        ],
        correctAnswer: 1,
        explanation: "Trojans are named after the Trojan Horse — they appear to be legitimate programs but contain hidden malicious functionality."
      },
      {
        id: "mw-q3",
        type: "true_false",
        question: "True or False: A worm can spread across a network without any user interaction or clicking.",
        options: [
          "True — Worms are self-propagating and exploit network vulnerabilities.",
          "False — All malware requires user action to spread."
        ],
        correctAnswer: 0,
        explanation: "Unlike viruses that require user interaction, worms can self-propagate by exploiting network vulnerabilities, spreading automatically from system to system."
      },
      {
        id: "mw-q4",
        type: "scenario",
        question: "Scenario: A pop-up on your screen claims 'YOUR COMPUTER IS INFECTED! CALL 1-800-SECURITY IMMEDIATELY.' What should you do?",
        options: [
          "Call the phone number and pay for remote repair",
          "Close your browser process via Task Manager and do NOT call the number",
          "Download whatever software the popup recommends",
          "Turn off your computer monitor and leave it on overnight"
        ],
        correctAnswer: 1,
        explanation: "Tech support scam popups use browser lock scripts to panic users into paying fake technicians or granting remote desktop access."
      }
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
        heading: "Introduction to Social Engineering",
        content: `Social engineering attacks exploit the most vulnerable element in any security system: human behavior. These attacks bypass technical defenses by manipulating people into breaking normal security procedures. Unlike malware or hacking, social engineering relies on psychological manipulation rather than technical exploits.`
      },
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
• **Smishing (SMS Phishing)**: Text messages alerting you to an undelivered package or bank hold with a short tracking link.
• **Pretexting**: Creating a fabricated scenario (pretext) to engage the victim and extract information — e.g., posing as a new employee who needs system access.`
      },
      {
        heading: "3. Physical Social Engineering & Tailgating",
        content: `Social engineering isn't purely digital. **Tailgating** occurs when an unauthorized person follows an employee through a secure door by holding heavy boxes or pretending to have forgotten their badge. **Dumpster Diving** involves searching through trash for sensitive documents, passwords written on sticky notes, or hardware containing data.`
      },
      {
        heading: "4. Real-World Examples",
        content: `• Kevin Mitnick, one of the most famous hackers in history, primarily used social engineering rather than technical hacking to breach systems.
• In 2020, a teenager used social engineering to convince a Twitter employee to provide access to internal tools, leading to the compromise of high-profile accounts including those of Barack Obama and Elon Musk.
• Help desk impersonation attacks increased by 300% during the shift to remote work during the COVID-19 pandemic.`
      },
      {
        heading: "5. Prevention Techniques",
        content: `• Implement strict verification procedures for phone and email requests
• Conduct regular security awareness training with social engineering simulations
• Establish a clear escalation process for suspicious requests
• Use badge access systems and visitor management protocols
• Create a culture where employees feel safe questioning unusual requests
• Never share passwords, PINs, or MFA codes with anyone, regardless of their claimed identity`
      },
      {
        heading: "Summary",
        content: `Social engineering is the most effective attack vector because it targets human psychology rather than technology. By understanding the psychological principles attackers exploit and maintaining healthy skepticism, you can become a human firewall against these manipulative attacks.`
      }
    ],
    warningChecklist: [
      "Did someone over the phone ask you to read back a 2FA verification code?",
      "Is an unknown person asking you to hold open a restricted door badge entrance?",
      "Did a caller ask for your login password to perform 'routine system maintenance'?",
      "Are you feeling pressured to bypass official procedure to help a caller?"
    ],
    questions: [
      {
        id: "se-q1",
        type: "mcq",
        question: "Someone claiming to be from 'Corporate Help Desk' phones you requesting your 2FA push approval code for a 'server migration'. What is the protocol?",
        options: [
          "Approve the push prompt to assist IT",
          "Refuse immediately; authentic IT staff will never ask you to approve unsolicited 2FA prompts",
          "Read your main password out loud to them",
          "Ask them to call back in 5 minutes"
        ],
        correctAnswer: 1,
        explanation: "This is a Vishing / MFA fatigue attack. Help Desk technicians do not require your live 2FA authorization."
      },
      {
        id: "se-q2",
        type: "mcq",
        question: "What is physical 'Tailgating' in cybersecurity?",
        options: [
          "Driving closely behind a delivery van",
          "Following an authorized employee through a badge-secured door without scanning your own badge",
          "Listening to music on headphones while walking in the hallway",
          "Using public charging stations at airports"
        ],
        correctAnswer: 1,
        explanation: "Tailgating exploits courtesy (holding doors open) to bypass physical access controls."
      },
      {
        id: "se-q3",
        type: "true_false",
        question: "True or False: Social engineering attacks only happen online through email and websites.",
        options: [
          "True — Social engineering is exclusively a digital threat.",
          "False — Social engineering includes phone calls (vishing), in-person manipulation (tailgating), and even dumpster diving."
        ],
        correctAnswer: 1,
        explanation: "Social engineering spans both digital and physical worlds, including phone calls, in-person impersonation, and physical security bypass techniques."
      },
      {
        id: "se-q4",
        type: "scenario",
        question: "Scenario: A person wearing a delivery uniform asks you to hold the secure door open because they have heavy packages. They don't have a visitor badge. What should you do?",
        options: [
          "Hold the door open since they're clearly a delivery person",
          "Politely direct them to the main reception desk where they can be properly signed in",
          "Take the packages from them and bring them inside yourself",
          "Ignore them completely and walk away"
        ],
        correctAnswer: 1,
        explanation: "Regardless of appearance, all visitors should be processed through proper security channels. Directing them to reception ensures proper verification."
      }
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
        heading: "Introduction to Network Security",
        content: `Network security is the practice of protecting the integrity, confidentiality, and availability of data as it is transmitted across or accessed through networks. As more organizations rely on cloud services and remote work, understanding network threats and protections has become essential for every user.`
      },
      {
        heading: "1. Public Wi-Fi Risks & Man-in-the-Middle (MITM) Attacks",
        content: `Unencrypted Wi-Fi hotspots in airports, cafes, and hotels expose network traffic to eavesdropping:
• **Eavesdropping / Packet Sniffing**: Unencrypted HTTP traffic can be intercepted by anyone on the same network using tools like Wireshark.
• **Rogue Hotspots (Evil Twin)**: Attackers set up an open Wi-Fi network named "Free_Airport_WiFi" to intercept all user credentials entering the router.
• **SSL Stripping**: Downgrading HTTPS connections to HTTP to intercept data that should be encrypted.`
      },
      {
        heading: "2. The Role of Virtual Private Networks (VPNs)",
        content: `A **VPN** creates an encrypted tunnel between your device and a secure remote server. Even if you connect to an insecure public network, all data flowing through the VPN tunnel is encrypted end-to-end using AES-256 standards, rendering sniffed traffic useless to hackers.

Key VPN benefits:
• Encrypts all network traffic end-to-end
• Masks your real IP address and location
• Bypasses network-level content restrictions
• Protects against packet sniffing on public networks`
      },
      {
        heading: "3. Firewall & Network Segmentation",
        content: `• **Firewalls** monitor and filter incoming and outgoing network traffic based on predefined security rules.
• **Network Segmentation** divides a network into smaller, isolated segments. If one segment is compromised, the attacker cannot easily move laterally to other segments.
• **Intrusion Detection Systems (IDS)** monitor network traffic for suspicious activity and known attack signatures.`
      },
      {
        heading: "4. Prevention & Best Practices",
        content: `• Always verify you're connecting to legitimate Wi-Fi networks
• Use a VPN whenever connecting to public or untrusted networks
• Ensure websites use HTTPS before entering sensitive information
• Keep router firmware updated to patch known vulnerabilities
• Use WPA3 encryption for wireless networks when available
• Implement network access control (NAC) policies
• Regularly audit network traffic for anomalies`
      },
      {
        heading: "Summary",
        content: `Network security protects data in transit from interception and tampering. Always use VPNs on untrusted networks, verify Wi-Fi network legitimacy, ensure HTTPS connections, and maintain strong firewall and segmentation practices. These layers of defense work together to protect your data.`
      }
    ],
    warningChecklist: [
      "Is your connection using HTTPS with a valid SSL padlock icon?",
      "Is your VPN active while working from coffee shops or airports?",
      "Is your home router using WPA2-Enterprise or WPA3 encryption?"
    ],
    questions: [
      {
        id: "ns-q1",
        type: "true_false",
        question: "True or False: Public Wi-Fi networks in coffee shops without password prompts encrypt your network traffic automatically.",
        options: [
          "True — All Wi-Fi signals are encrypted by default.",
          "False — Open public Wi-Fi broadcasts unencrypted traffic that can be sniffed by anyone on the network."
        ],
        correctAnswer: 1,
        explanation: "Open Wi-Fi broadcasts packets in plain air. Always activate an encrypted Virtual Private Network (VPN) when on untrusted public connections."
      },
      {
        id: "ns-q2",
        type: "mcq",
        question: "What is an 'Evil Twin' attack?",
        options: [
          "A virus that duplicates itself on your hard drive",
          "A rogue Wi-Fi access point that mimics a legitimate network name to intercept traffic",
          "An attack that targets twin servers simultaneously",
          "A backup server that mirrors the primary server"
        ],
        correctAnswer: 1,
        explanation: "An Evil Twin attack involves setting up a fraudulent Wi-Fi access point with a name similar to a legitimate network, tricking users into connecting and exposing their traffic."
      },
      {
        id: "ns-q3",
        type: "scenario",
        question: "Scenario: You need to access your company's internal systems while working from a hotel. The hotel offers free Wi-Fi. What is the safest approach?",
        options: [
          "Connect directly to the hotel Wi-Fi and log in to company systems",
          "Use your mobile phone's hotspot without any encryption",
          "Connect to the hotel Wi-Fi and then activate your company's VPN before accessing any internal systems",
          "Ask the hotel front desk if their Wi-Fi is 'secure'"
        ],
        correctAnswer: 2,
        explanation: "A VPN creates an encrypted tunnel over the untrusted hotel network, protecting all your data in transit from potential eavesdroppers."
      },
      {
        id: "ns-q4",
        type: "mcq",
        question: "What does network segmentation help prevent?",
        options: [
          "Software updates from being applied",
          "Lateral movement by attackers who have breached one part of the network",
          "Employees from using the internet",
          "VPN connections from working properly"
        ],
        correctAnswer: 1,
        explanation: "Network segmentation isolates different parts of the network so that if one segment is compromised, the attacker cannot easily move to other segments."
      }
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
        heading: "Introduction to Data Privacy",
        content: `Data privacy is about ensuring that personal information is collected, stored, processed, and shared responsibly and in compliance with legal requirements. As data breaches become more common and regulations tighten globally, understanding data privacy principles is essential for every professional.`
      },
      {
        heading: "1. Understanding PII & Sensitive Data",
        content: `**PII (Personally Identifiable Information)** refers to any data that could potentially identify a specific individual:
• Full Name, Social Security Number (SSN), Passport Number.
• IP Address, Device Identifiers, Biometric Records.
• Credit Card numbers, bank routing information, and health history.
• Email addresses, phone numbers, and physical addresses.

**Sensitive PII** requires additional protection: Social Security numbers, financial account numbers, medical records, and biometric data.`
      },
      {
        heading: "2. Privacy Regulations Overview",
        content: `• **GDPR (General Data Protection Regulation)**: EU regulation requiring explicit consent for data collection, right to erasure, and data portability.
• **CCPA (California Consumer Privacy Act)**: Gives California residents the right to know what data is collected and to request its deletion.
• **HIPAA (Health Insurance Portability and Accountability Act)**: Protects the privacy of patient health information in the US healthcare system.

Non-compliance can result in fines up to 4% of annual global turnover (GDPR) or $7,500 per violation (CCPA).`
      },
      {
        heading: "3. Real-World Data Breach Examples",
        content: `• **Equifax (2017)**: 147 million records exposed including SSNs, resulting in a $700 million settlement.
• **Marriott (2018)**: 500 million guest records exposed over 4 years, including passport numbers.
• **Facebook/Cambridge Analytica (2018)**: Data of 87 million users harvested without consent for political advertising.`
      },
      {
        heading: "4. Prevention & Best Practices",
        content: `• Classify all data according to sensitivity levels (Public, Internal, Confidential, Restricted)
• Encrypt sensitive data at rest (AES-256) and in transit (TLS 1.3)
• Implement role-based access control (RBAC) — only authorized personnel access sensitive data
• Apply data minimization — collect only what is strictly necessary
• Establish data retention policies and securely dispose of data no longer needed
• Conduct regular privacy impact assessments
• Train all employees on data handling procedures`
      },
      {
        heading: "Summary",
        content: `Data privacy is both a legal obligation and an ethical responsibility. Protect PII through encryption, access controls, data minimization, and compliance with regulations like GDPR, CCPA, and HIPAA. Regular training and privacy assessments help maintain a strong data protection posture.`
      }
    ],
    warningChecklist: [
      "Are confidential customer spreadsheets encrypted before emailing?",
      "Are old hard drives wiped using DoD 5220.22-M sanitization standards?",
      "Is access to sensitive databases limited to authorized employees only?"
    ],
    questions: [
      {
        id: "dp-q1",
        type: "scenario",
        question: "Scenario: You are emailing a spreadsheet containing customer Social Security Numbers to an external auditor. How must this file be handled?",
        options: [
          "Attach the spreadsheet as a normal unencrypted .xlsx file",
          "Encrypt the file and send the decryption password through a separate communication channel",
          "Post the spreadsheet to a public cloud link",
          "Rename the file to 'Recipes.xlsx' to trick hackers"
        ],
        correctAnswer: 1,
        explanation: "PII must be encrypted at rest and in transit. Encryption keys should never be sent in the same email as the encrypted data."
      },
      {
        id: "dp-q2",
        type: "mcq",
        question: "Which regulation gives EU citizens the 'Right to be Forgotten' (right to erasure)?",
        options: [
          "HIPAA",
          "CCPA",
          "GDPR",
          "SOX"
        ],
        correctAnswer: 2,
        explanation: "The GDPR (General Data Protection Regulation) explicitly grants EU citizens the right to request deletion of their personal data."
      },
      {
        id: "dp-q3",
        type: "true_false",
        question: "True or False: An IP address is not considered Personally Identifiable Information (PII).",
        options: [
          "True — IP addresses are just network identifiers.",
          "False — IP addresses can be used to identify individuals and are classified as PII under GDPR."
        ],
        correctAnswer: 1,
        explanation: "Under GDPR and many privacy frameworks, IP addresses are considered PII because they can be used to identify or track an individual."
      },
      {
        id: "dp-q4",
        type: "mcq",
        question: "What is 'Data Minimization' in the context of privacy?",
        options: [
          "Compressing data files to save storage space",
          "Collecting and retaining only the minimum personal data necessary for a specific purpose",
          "Deleting all data every 30 days",
          "Using smaller database servers"
        ],
        correctAnswer: 1,
        explanation: "Data minimization is a core privacy principle requiring organizations to collect only the data strictly necessary for their stated purpose, reducing breach exposure."
      }
    ]
  },

  {
    id: "ransomware-1",
    category: "Ransomware",
    categorySlug: "ransomware",
    title: "Ransomware Defense & Incident Response",
    subtitle: "Learn how ransomware encrypts your data and the critical steps to prevent and respond to attacks.",
    icon: "💀",
    readTime: "7 min read",
    xpReward: 130,
    difficulty: "Advanced",
    badgeReward: "malware_defender",
    overview: "Ransomware is a specialized form of malware that encrypts files on a victim's system and demands payment (usually in cryptocurrency) for the decryption key. Ransomware attacks have crippled hospitals, governments, and corporations worldwide, causing billions in damages annually.",
    keyTakeaways: [
      "Maintain offline, encrypted backups following the 3-2-1 backup strategy.",
      "Never pay the ransom — there is no guarantee attackers will provide the decryption key.",
      "Segment networks to limit the spread of ransomware across systems.",
      "Have an incident response plan tested and ready before an attack occurs."
    ],
    sections: [
      {
        heading: "Introduction to Ransomware",
        content: `Ransomware has evolved from simple screen-locking malware into sophisticated, multi-stage operations run by organized criminal groups. Modern ransomware gangs often employ 'double extortion' — encrypting data AND threatening to leak stolen information publicly if the ransom isn't paid. The average ransomware payment exceeded $800,000 in 2024, and total global damages are projected to reach $265 billion by 2031.`
      },
      {
        heading: "1. How Ransomware Works",
        content: `Ransomware typically follows these stages:
1. **Initial Access**: Through phishing emails, exploited vulnerabilities, or compromised RDP (Remote Desktop Protocol) connections.
2. **Lateral Movement**: The malware spreads through the network, identifying and accessing file servers, databases, and backup systems.
3. **Data Exfiltration**: Modern ransomware groups steal sensitive data before encryption for double extortion leverage.
4. **Encryption**: Files are encrypted using strong algorithms (AES-256 + RSA), rendering them unusable without the decryption key.
5. **Ransom Demand**: A ransom note is displayed demanding payment in cryptocurrency (Bitcoin, Monero) within a deadline.`
      },
      {
        heading: "2. Real-World Ransomware Attacks",
        content: `• **WannaCry (2017)**: Exploited the EternalBlue Windows vulnerability, affecting 200,000+ systems in 150 countries. The UK's National Health Service was severely disrupted.
• **Colonial Pipeline (2021)**: A ransomware attack forced the shutdown of the largest fuel pipeline in the United States, causing fuel shortages along the East Coast. The company paid $4.4 million in ransom.
• **Kaseya (2021)**: Supply-chain ransomware attack through IT management software, affecting up to 1,500 businesses simultaneously.
• **MOVEit (2023)**: Exploitation of a file transfer vulnerability led to data theft from hundreds of organizations, including government agencies.`
      },
      {
        heading: "3. Warning Signs of a Ransomware Attack",
        content: `• Unusual file extension changes (e.g., files renamed to .encrypted, .locked, .crypto)
• Inability to open previously accessible files
• Ransom notes appearing on the desktop or in folders
• Unexplained network activity or high CPU usage
• Antivirus/security tools being disabled unexpectedly
• Backup systems being targeted or deleted
• Unusual outbound network traffic (data exfiltration)`
      },
      {
        heading: "4. The 3-2-1 Backup Strategy",
        content: `The gold standard for ransomware protection is the **3-2-1 Backup Strategy**:
• **3** copies of your critical data.
• **2** different storage media types (e.g., local SSD + cloud storage).
• **1** copy stored **offline / air-gapped** from the network.

Air-gapped backups are critical because modern ransomware specifically targets connected backup systems. Test backup restoration procedures regularly — an untested backup is not a backup.`
      },
      {
        heading: "5. Incident Response Checklist",
        content: `If ransomware is detected:
1. **Isolate** affected systems from the network immediately (disconnect cables, disable Wi-Fi)
2. **Do NOT pay the ransom** — payment funds criminal operations and doesn't guarantee data recovery
3. **Preserve evidence** — don't wipe systems; forensic data is needed for investigation
4. **Notify** your incident response team, management, and potentially law enforcement (FBI/CISA)
5. **Assess the scope** — determine which systems and data are affected
6. **Restore from clean backups** after the infection vector is identified and patched
7. **Conduct a post-incident review** to prevent recurrence`
      },
      {
        heading: "Summary",
        content: `Ransomware is one of the most damaging cyber threats organizations face today. Prevention through regular patching, network segmentation, email security, and robust air-gapped backup strategies is far more effective and less costly than dealing with an active ransomware incident. Never pay the ransom, and always have a tested incident response plan ready.`
      }
    ],
    warningChecklist: [
      "Do you have air-gapped (offline) backups of critical data?",
      "Is Remote Desktop Protocol (RDP) disabled or secured with MFA?",
      "Has your organization tested its incident response plan recently?",
      "Are email attachments scanned and macro execution disabled by default?"
    ],
    questions: [
      {
        id: "rw-q1",
        type: "mcq",
        question: "What is 'double extortion' in the context of ransomware?",
        options: [
          "Paying the ransom twice",
          "Encrypting data AND threatening to publicly leak stolen data if the ransom isn't paid",
          "Attacking two organizations at the same time",
          "Using two types of encryption algorithms"
        ],
        correctAnswer: 1,
        explanation: "Double extortion combines traditional file encryption with the threat of publishing stolen sensitive data, increasing pressure on victims to pay."
      },
      {
        id: "rw-q2",
        type: "true_false",
        question: "True or False: Paying the ransomware ransom guarantees that attackers will provide the decryption key and restore all your files.",
        options: [
          "True — Ransomware operators always honor payment agreements.",
          "False — There is no guarantee of file recovery, and payment funds further criminal activity."
        ],
        correctAnswer: 1,
        explanation: "Paying ransom does not guarantee data recovery. Studies show that only 65% of data is recovered on average after payment, and payment funds future attacks."
      },
      {
        id: "rw-q3",
        type: "mcq",
        question: "In the 3-2-1 backup strategy, what does the '1' represent?",
        options: [
          "1 backup per day",
          "1 type of encryption",
          "1 copy stored offline/air-gapped from the network",
          "1 backup administrator"
        ],
        correctAnswer: 2,
        explanation: "The '1' in the 3-2-1 strategy means keeping at least one backup copy offline (air-gapped), protecting it from ransomware that targets connected backup systems."
      },
      {
        id: "rw-q4",
        type: "scenario",
        question: "Scenario: You discover a ransom note on your work computer and your files have been encrypted. What is your FIRST action?",
        options: [
          "Immediately pay the ransom to recover your files",
          "Try to decrypt the files yourself using online tools",
          "Disconnect the computer from the network and notify your IT security team immediately",
          "Restart the computer to see if the problem goes away"
        ],
        correctAnswer: 2,
        explanation: "The first priority is containment — disconnecting from the network prevents the ransomware from spreading to other systems. Then immediately notify your security team."
      },
      {
        id: "rw-q5",
        type: "mcq",
        question: "Which of the following is the most common initial access vector for ransomware attacks?",
        options: [
          "Physical USB drives",
          "Phishing emails with malicious attachments or links",
          "Bluetooth connections",
          "Social media messages"
        ],
        correctAnswer: 1,
        explanation: "Phishing emails remain the most common delivery method for ransomware, accounting for approximately 75% of ransomware infections."
      }
    ]
  },

  {
    id: "safe-browsing-1",
    category: "Safe Browsing",
    categorySlug: "safe-browsing",
    title: "Safe Browsing Habits & Web Security",
    subtitle: "Protect yourself from malicious websites, browser exploits, and online tracking.",
    icon: "🛡️",
    readTime: "5 min read",
    xpReward: 100,
    difficulty: "Beginner",
    badgeReward: "first_step",
    overview: "Safe browsing practices are essential for protecting yourself from malicious websites, drive-by downloads, browser exploits, and invasive online tracking. Every website you visit, link you click, and download you initiate carries potential security risks that can be mitigated with proper awareness.",
    keyTakeaways: [
      "Always verify URLs and look for HTTPS before entering sensitive information.",
      "Keep your browser and extensions updated to patch known vulnerabilities.",
      "Use ad blockers and privacy extensions to reduce attack surface.",
      "Be cautious with downloads — only install software from official sources."
    ],
    sections: [
      {
        heading: "Introduction to Safe Browsing",
        content: `The web browser is the primary interface between users and the internet, making it a high-value target for attackers. From malicious advertisements to compromised legitimate websites, threats lurk across the web. Developing safe browsing habits is one of the most impactful steps you can take to protect your digital security.`
      },
      {
        heading: "1. Understanding HTTPS & SSL/TLS",
        content: `• **HTTPS (Hypertext Transfer Protocol Secure)** encrypts data between your browser and the website server using SSL/TLS protocols.
• Always look for the **padlock icon** in the address bar before entering passwords, credit cards, or personal information.
• **Warning**: HTTPS alone doesn't mean a website is legitimate — phishing sites can also use HTTPS certificates.
• Check for valid SSL certificates: click the padlock to verify the certificate issuer and domain ownership.`
      },
      {
        heading: "2. Common Web-Based Threats",
        content: `• **Drive-by Downloads**: Malware that downloads automatically when visiting a compromised website, without clicking anything.
• **Malvertising**: Malicious code embedded in online advertisements, even on legitimate websites.
• **Watering Hole Attacks**: Compromising websites frequently visited by a target group to infect their systems.
• **Browser Exploits**: Attacks targeting vulnerabilities in outdated browsers or plugins (Flash, Java).
• **Cryptojacking**: Websites secretly using your browser to mine cryptocurrency, slowing your computer.`
      },
      {
        heading: "3. Real-World Examples",
        content: `• In 2019, a major news website unknowingly served malvertising that installed ransomware on visitors' computers through compromised ad networks.
• The Magecart group has compromised thousands of e-commerce websites by injecting card-skimming JavaScript code into checkout pages, stealing millions of credit card numbers.
• Browser extension supply chain attacks have affected millions of users when trusted extensions were sold to malicious developers who injected data-harvesting code.`
      },
      {
        heading: "4. Warning Signs of Dangerous Websites",
        content: `Watch for these indicators of potentially malicious websites:
• Missing or invalid HTTPS certificate (browser warnings)
• URLs with unusual character substitutions or extra subdomains
• Pop-ups claiming your computer is infected and urging you to call a number
• Requests to install browser plugins or download software to view content
• Excessive redirects through multiple domains
• Pages that look like login forms but have slightly wrong URLs`
      },
      {
        heading: "5. Prevention & Best Practices",
        content: `• Keep your browser updated to the latest version at all times
• Use reputable ad-blocking and privacy extensions (uBlock Origin, Privacy Badger)
• Never download software from pop-up advertisements or unofficial sources
• Regularly review and remove unnecessary browser extensions
• Clear cookies and browsing data periodically
• Use a DNS-level filter (like Cloudflare 1.1.1.3 for Families) to block known malicious domains
• Enable 'Safe Browsing' features built into Chrome, Firefox, and Edge
• Avoid clicking shortened URLs from untrusted sources — use URL preview services`
      },
      {
        heading: "Summary",
        content: `Safe browsing is a critical everyday security practice. Verify HTTPS connections, keep browsers updated, use ad blockers, be cautious with downloads, and recognize the warning signs of malicious websites. These habits significantly reduce your exposure to web-based threats.`
      }
    ],
    warningChecklist: [
      "Is your browser updated to the latest version?",
      "Do you verify HTTPS before entering passwords or payment information?",
      "Are you using an ad blocker to reduce malvertising risk?",
      "Do you download software only from official sources?"
    ],
    questions: [
      {
        id: "sb-q1",
        type: "mcq",
        question: "What does a padlock icon in the browser's address bar indicate?",
        options: [
          "The website is guaranteed to be safe and trustworthy",
          "The connection between your browser and the website is encrypted using SSL/TLS",
          "The website has been verified by your antivirus software",
          "The website doesn't contain any advertisements"
        ],
        correctAnswer: 1,
        explanation: "The padlock indicates an encrypted HTTPS connection, but it does NOT guarantee the website is legitimate — phishing sites can also have valid SSL certificates."
      },
      {
        id: "sb-q2",
        type: "true_false",
        question: "True or False: A website with HTTPS is guaranteed to be safe and free from phishing.",
        options: [
          "True — HTTPS means the website has been verified as legitimate.",
          "False — HTTPS only encrypts the connection. Phishing sites can also use HTTPS certificates."
        ],
        correctAnswer: 1,
        explanation: "HTTPS ensures data encryption in transit but does not verify the legitimacy or intent of the website. Phishing sites frequently use free SSL certificates."
      },
      {
        id: "sb-q3",
        type: "scenario",
        question: "Scenario: While reading a news article, a pop-up appears saying 'Your Flash Player is out of date! Click here to update.' What should you do?",
        options: [
          "Click the update link since keeping software updated is important",
          "Close the pop-up; Flash Player has been discontinued, and legitimate updates never come through pop-ups on random websites",
          "Allow the download but scan it with antivirus first",
          "Disable your antivirus to allow the update"
        ],
        correctAnswer: 1,
        explanation: "Adobe Flash Player was discontinued in 2020. Pop-ups claiming to update Flash (or other plugins) are a classic malvertising technique used to deliver malware."
      },
      {
        id: "sb-q4",
        type: "mcq",
        question: "What is 'Cryptojacking'?",
        options: [
          "Stealing cryptocurrency from someone's wallet",
          "Websites secretly using your browser to mine cryptocurrency without your consent",
          "Encrypting someone's files and demanding ransom in crypto",
          "Hacking into a cryptocurrency exchange"
        ],
        correctAnswer: 1,
        explanation: "Cryptojacking involves malicious JavaScript code on websites that hijacks your browser's computing power to mine cryptocurrency, slowing your computer and increasing energy usage."
      }
    ]
  }
];
