export const QUIZ_SUITES = {
  all: [], // Will be filled dynamically by combining all categories
  
  phishing: [
    {
      id: "ph-q1",
      category: "Phishing",
      type: "mcq",
      question: "You receive an urgent email claiming your bank account will be locked unless you click a link to verify credentials. What is the safest action?",
      options: [
        "Click the link immediately to prevent lockup.",
        "Ignore the warning and delete your bank account.",
        "Do NOT click the link; navigate directly to official bank app or website.",
        "Forward the link to all your coworkers."
      ],
      correctAnswer: 2,
      explanation: "Legitimate institutions never request passwords via external email links. Always navigate directly via verified URLs."
    },
    {
      id: "ph-q2",
      category: "Phishing",
      type: "true_false",
      question: "True or False: If a phishing email matches your company logo and template, it must have come from an internal employee.",
      options: [
        "True — Attackers cannot duplicate corporate brand designs.",
        "False — Attackers frequently copy publicly available HTML templates and logos to mimic target companies."
      ],
      correctAnswer: 1,
      explanation: "HTML templates and logo images are publicly readable. Cybercriminals copy them to make spoofed emails look legitimate."
    },
    {
      id: "ph-q3",
      category: "Phishing",
      type: "scenario",
      question: "Scenario: An email arrives from 'accounts-service@paypa1.com' alerting you to a $500 unauthorized transaction. The domain has a '1' instead of an 'l'. What attack is this?",
      options: [
        "Pharma Phishing",
        "Typosquatting / Spoofed Domain Phishing",
        "SQL Injection",
        "Ransomware Payload"
      ],
      correctAnswer: 1,
      explanation: "Typosquatting relies on register lookalike domains (using 1 instead of l, or rn instead of m) to trick users into trusting a spoofed domain."
    },
    {
      id: "ph-q4",
      category: "Phishing",
      type: "mcq",
      question: "What is spear phishing?",
      options: [
        "Phishing attacks directed at fishermen",
        "Highly targeted phishing campaigns using personalized details about a specific victim",
        "A script that automatically reports spam",
        "Mass-spamming emails to millions of recipients at once"
      ],
      correctAnswer: 1,
      explanation: "Spear phishing is highly targeted and researched. Attackers gather personal details (from LinkedIn or social media) to compromise a specific high-value target."
    },
    {
      id: "ph-q5",
      category: "Phishing",
      type: "mcq",
      question: "You receive an unexpected invoice attachment in an email from an unknown sender. What should you do?",
      options: [
        "Open it immediately to check if you owe money.",
        "Delete the email, or report it using your company's reporting button.",
        "Forward it to your personal email to examine it on a home computer.",
        "Reply to the email asking the sender who they are."
      ],
      correctAnswer: 1,
      explanation: "Opening unexpected attachments runs the risk of executing macros or malicious binaries. Always delete or report them."
    },
    {
      id: "ph-q6",
      category: "Phishing",
      type: "true_false",
      question: "True or False: Phishing can only occur through email systems.",
      options: [
        "True — Other channels use hacking protocols.",
        "False — Phishing occurs via phone (vishing), SMS (smishing), and instant messaging."
      ],
      correctAnswer: 1,
      explanation: "Phishing is social engineering delivered via any communication channel: SMS (smishing), phone calls (vishing), and chat apps."
    },
    {
      id: "ph-q7",
      category: "Phishing",
      type: "scenario",
      question: "Scenario: You receive a text message: 'Your package delivery is on hold. Click here to confirm address: post-office-tracking.xyz'. What threat is this?",
      options: [
        "Spear Phishing",
        "Smishing (SMS Phishing)",
        "Man-in-the-Middle Attack",
        "Keylogger payload"
      ],
      correctAnswer: 1,
      explanation: "Smishing is phishing sent via SMS text message, often mimicking postal services, delivery tracking, or bank alerts."
    },
    {
      id: "ph-q8",
      category: "Phishing",
      type: "mcq",
      question: "What does the 'hover' technique help you do when reviewing links in emails?",
      options: [
        "Open the page in a secure sandbox",
        "Preview the real target URL behind the display text before clicking",
        "Scan the website for viruses",
        "Send a report to Google Security"
      ],
      correctAnswer: 1,
      explanation: "Hovering your cursor over a link shows its destination address, helping you verify if the hyperlink matches the claimed domain."
    }
  ],

  passwords: [
    {
      id: "pw-q1",
      category: "Password Security",
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
      category: "Password Security",
      type: "mcq",
      question: "Which of the following is the most secure method of storing passwords?",
      options: [
        "In a password-protected Excel spreadsheet on your Desktop.",
        "In an encrypted Password Manager vault.",
        "Written down on a notepad kept under your keyboard.",
        "Saved in plain-text inside your browser's autofill cache."
      ],
      correctAnswer: 1,
      explanation: "Password managers use high-grade encryption (like AES-256) to protect credentials, preventing attackers from accessing them even if your computer is compromised."
    },
    {
      id: "pw-q3",
      category: "Password Security",
      type: "scenario",
      question: "Scenario: A hacker gets access to a leaked database containing your password for an online retail website. If you reuse this password, what attack will they likely perform next?",
      options: [
        "DDoS Attack",
        "Credential Stuffing Attack",
        "Ransomware Encryption",
        "Phishing Email"
      ],
      correctAnswer: 1,
      explanation: "Credential stuffing uses automated scripts to try leaked username/password combinations across hundreds of other popular websites."
    },
    {
      id: "pw-q4",
      category: "Password Security",
      type: "mcq",
      question: "What is Multi-Factor Authentication (MFA)?",
      options: [
        "Entering your password twice.",
        "Using multiple passwords for the same login.",
        "Requiring two or more verification factors to gain access to an account.",
        "Encrypting a database with multiple keys."
      ],
      correctAnswer: 2,
      explanation: "MFA requires factors from different categories: something you know (password), something you have (authenticator token), or something you are (biometrics)."
    },
    {
      id: "pw-q5",
      category: "Password Security",
      type: "true_false",
      question: "True or False: Using SMS for Multi-Factor Authentication is completely secure.",
      options: [
        "True — SMS codes are encrypted end-to-end.",
        "False — SMS is vulnerable to SIM swapping attacks and interception."
      ],
      correctAnswer: 1,
      explanation: "SIM swapping allows attackers to steal your phone number and receive your SMS verification codes. Authenticator apps (TOTP) are much safer."
    },
    {
      id: "pw-q6",
      category: "Password Security",
      type: "mcq",
      question: "What is a 'passphrase'?",
      options: [
        "A password containing only symbols.",
        "A sequence of random words linked together as a long password.",
        "A phrase you speak into a microphone to log in.",
        "A short hint to help you remember your password."
      ],
      correctAnswer: 1,
      explanation: "Passphrases (e.g. 'correct-horse-battery-staple') are very long, making them incredibly hard to brute-force, yet easy for humans to remember."
    },
    {
      id: "pw-q7",
      category: "Password Security",
      type: "scenario",
      question: "Scenario: You get a notification: 'Approved sign-in request from Moscow, Russia' on your authenticator app. You are at home in New York. What is this?",
      options: [
        "An automated test by your IT team",
        "MFA Fatigue / Push Bombing Attack",
        "A standard system update notification",
        "An encrypted SSL alert"
      ],
      correctAnswer: 1,
      explanation: "Push Bombing occurs when attackers who know your password spam you with MFA push approvals, hoping you click 'Approve' to stop the alerts."
    },
    {
      id: "pw-q8",
      category: "Password Security",
      type: "mcq",
      question: "How often should you reuse passwords?",
      options: [
        "Never — every single account must have a unique password.",
        "Only for low-security websites.",
        "Every 6 months.",
        "For accounts within the same department."
      ],
      correctAnswer: 0,
      explanation: "Reusing passwords is a major security risk. If one account is breached, all other accounts sharing that password are immediately vulnerable."
    }
  ],

  malware: [
    {
      id: "mw-q1",
      category: "Malware",
      type: "scenario",
      question: "Scenario: A coworker leaves an unmarked USB thumb drive on your desk with 'Confidential Salaries' handwritten on it. What should you do?",
      options: [
        "Plug it into your workstation to see who owns it.",
        "Turn the USB drive in to your IT/Security team without plugging it into any device.",
        "Plug it into your personal home computer instead.",
        "Leave it on the desk and post on social media asking whose USB it is."
      ],
      correctAnswer: 1,
      explanation: "USB drop attacks are a classic malware delivery tactic. Plugging unknown USB drives can execute rubber-ducky scripts or silent keyloggers instantly."
    },
    {
      id: "mw-q2",
      category: "Malware",
      type: "mcq",
      question: "What type of malware logs everything you type on your keyboard?",
      options: [
        "Spyware",
        "Keylogger",
        "Trojan",
        "Adware"
      ],
      correctAnswer: 1,
      explanation: "Keyloggers capture keystrokes, allowing attackers to harvest passwords, banking PINs, and sensitive conversations."
    },
    {
      id: "mw-q3",
      category: "Malware",
      type: "true_false",
      question: "True or False: A computer worm requires a user to click on a file in order to infect a system.",
      options: [
        "True — All malware requires some user action.",
        "False — Worms are self-propagating and exploit network vulnerabilities to spread automatically."
      ],
      correctAnswer: 1,
      explanation: "Worms spread automatically by scanning networks for unpatched vulnerabilities, bypassing the need for human interaction."
    },
    {
      id: "mw-q4",
      category: "Malware",
      type: "mcq",
      question: "What is a Trojan in cybersecurity?",
      options: [
        "A firewall protection program.",
        "Malware disguised as legitimate software that opens a backdoor for attackers.",
        "A network scanning utility.",
        "An encrypted VPN client."
      ],
      correctAnswer: 1,
      explanation: "Trojans masquerade as useful utilities (e.g. a free PDF reader) but run malicious scripts silently in the background."
    },
    {
      id: "mw-q5",
      category: "Malware",
      type: "scenario",
      question: "Scenario: Your antivirus reports detecting a 'Trojan-Downloader' in a game you cracked and downloaded. What is the safest response?",
      options: [
        "Ignore the warning; cracked games always trigger false positives.",
        "Disable the antivirus temporarily to install the game.",
        "Quarantine and delete the file immediately.",
        "Upload the file to a cloud drive."
      ],
      correctAnswer: 2,
      explanation: "Software cracks and illegal torrent downloads are a major source of embedded malware. Never bypass antivirus alerts."
    },
    {
      id: "mw-q6",
      category: "Malware",
      type: "true_false",
      question: "True or False: Spyware can record audio and video from your webcam without triggering the recording light.",
      options: [
        "True — Advanced spyware can manipulate driver firmware to disable indicators.",
        "False — Hardware lights are physically hardwired to turn on."
      ],
      correctAnswer: 0,
      explanation: "Sophisticated hackers can alter camera firmware to capture feeds without activating status LEDs, which is why camera covers are recommended."
    },
    {
      id: "mw-q7",
      category: "Malware",
      type: "mcq",
      question: "What is a 'Zero-Day' vulnerability?",
      options: [
        "A vulnerability that takes zero days to fix.",
        "A software vulnerability that is unknown to the vendor and has no patch available.",
        "A bug that disables computers at midnight.",
        "A network scan that returns no errors."
      ],
      correctAnswer: 1,
      explanation: "Zero-Day vulnerabilities are exploited before the software maker is aware of the issue, leaving users defenseless until a patch is developed."
    },
    {
      id: "mw-q8",
      category: "Malware",
      type: "mcq",
      question: "Which of the following helps prevent malware infections?",
      options: [
        "Installing automatic operating system updates.",
        "Disabling your local firewall.",
        "Sharing your computer login credentials.",
        "Opening all email attachments to scan them."
      ],
      correctAnswer: 0,
      explanation: "Regular software updates patch security flaws, preventing worms and automated exploits from entering your operating system."
    }
  ],

  social: [
    {
      id: "se-q1",
      category: "Social Engineering",
      type: "mcq",
      question: "Someone claiming to be from 'Corporate Help Desk' phones you requesting your 2FA push approval code for a 'server migration'. What is the protocol?",
      options: [
        "Approve the push prompt to assist IT.",
        "Refuse immediately; authentic IT staff will never ask you to approve unsolicited 2FA prompts.",
        "Read your main password out loud to them.",
        "Ask them to call back in 5 minutes."
      ],
      correctAnswer: 1,
      explanation: "This is a Vishing / MFA fatigue attack. Help Desk technicians do not require your live 2FA authorization."
    },
    {
      id: "se-q2",
      category: "Social Engineering",
      type: "mcq",
      question: "What is physical 'Tailgating' in cybersecurity?",
      options: [
        "Driving closely behind a delivery van.",
        "Following an authorized employee through a badge-secured door without scanning your own badge.",
        "Listening to music on headphones while walking in the hallway.",
        "Using public charging stations at airports."
      ],
      correctAnswer: 1,
      explanation: "Tailgating exploits courtesy (holding doors open) to bypass physical access controls."
    },
    {
      id: "se-q3",
      category: "Social Engineering",
      type: "true_false",
      question: "True or False: Social engineering attacks strictly target digital platforms and cannot occur in person.",
      options: [
        "True — Real-world interactions are safe.",
        "False — In-person impersonation, badge bypass (tailgating), and phone calls (vishing) are highly common."
      ],
      correctAnswer: 1,
      explanation: "Social engineering targets the human element across all domains, including in-person encounters and voice calls."
    },
    {
      id: "se-q4",
      category: "Social Engineering",
      type: "mcq",
      question: "Which psychological trigger is an attacker exploiting when they claim your banking details must be updated within 2 hours or your cards will deactivate?",
      options: [
        "Social Proof",
        "Authority",
        "Urgency / Fear",
        "Reciprocity"
      ],
      correctAnswer: 2,
      explanation: "Attackers create artificial time constraints (urgency) to provoke anxiety, making targets act before thinking critically."
    },
    {
      id: "se-q5",
      category: "Social Engineering",
      type: "scenario",
      question: "Scenario: A visitor walks into the office claiming they are a maintenance technician sent to fix a leak. They ask you to let them into the server room. What is the correct protocol?",
      options: [
        "Unlock the room for them to be helpful.",
        "Verify their work order and check their credentials with facilities management before granting access.",
        "Give them the master key card.",
        "Ignore them and let someone else deal with it."
      ],
      correctAnswer: 1,
      explanation: "Impersonation of service staff is a classic physical penetration technique. Always verify contractor tickets before letting them into sensitive areas."
    },
    {
      id: "se-q6",
      category: "Social Engineering",
      type: "true_false",
      question: "True or False: Vishing (voice phishing) calls can spoof caller ID numbers to appear as if they are originating from local phone prefixes or trusted institutions.",
      options: [
        "True — VOIP systems allow callers to broadcast arbitrary spoofed numbers.",
        "False — Caller ID displays are verified by telecom providers."
      ],
      correctAnswer: 0,
      explanation: "Caller ID spoofing is trivial with modern phone technology. Never trust caller ID alone as a proof of identity."
    },
    {
      id: "se-q7",
      category: "Social Engineering",
      type: "mcq",
      question: "What is 'Pretexting' in social engineering?",
      options: [
        "Sending a text message before a phone call.",
        "Creating a fabricated scenario (pretext) to establish trust and trick the victim into sharing data.",
        "A method of bypassing network firewalls.",
        "Writing draft emails without sending them."
      ],
      correctAnswer: 1,
      explanation: "Pretexting is the act of inventing a false story (e.g. pretending to be an auditor executing an internal review) to lower the victim's defenses."
    },
    {
      id: "se-q8",
      category: "Social Engineering",
      type: "mcq",
      question: "What should you do if you receive an unexpected phone call asking for confidential employee records?",
      options: [
        "Refuse to share and request their name and call-back number, then verify their request through official corporate channels.",
        "Provide the records immediately to avoid delaying business operations.",
        "Forward them to a public document link.",
        "Give them false numbers to play a joke on them."
      ],
      correctAnswer: 0,
      explanation: "Never share sensitive directory data on inbound phone calls. Establish their identity and verify the business request independently."
    }
  ],

  network: [
    {
      id: "ns-q1",
      category: "Network Security",
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
      category: "Network Security",
      type: "mcq",
      question: "What does a VPN (Virtual Private Network) do?",
      options: [
        "Increases your internet bandwidth.",
        "Creates a secure, encrypted tunnel for your network traffic, protecting it from interception.",
        "Cleans viruses from downloaded files.",
        "Deletes cookies from your browser."
      ],
      correctAnswer: 1,
      explanation: "VPNs encapsulate your network packets in encryption, preventing local eavesdroppers from sniffing your data."
    },
    {
      id: "ns-q3",
      category: "Network Security",
      type: "scenario",
      question: "Scenario: You connect to hotel Wi-Fi and see a browser alert: 'Your connection is not private. The security certificate is invalid.' What is the primary risk?",
      options: [
        "Your computer has run out of storage.",
        "A Man-in-the-Middle (MITM) attack or SSL interception by a rogue router.",
        "The hotel website has shut down.",
        "Your monitor is malfunctioning."
      ],
      correctAnswer: 1,
      explanation: "Certificate warnings occur when the SSL handshake is intercepted, indicating a potential rogue router attempting to decrypt your traffic."
    },
    {
      id: "ns-q4",
      category: "Network Security",
      type: "mcq",
      question: "What is an 'Evil Twin' Wi-Fi attack?",
      options: [
        "A twin virus payload.",
        "A rogue access point configured with the same network name (SSID) as a trusted local connection.",
        "A dual-network router scan.",
        "A cloned server database."
      ],
      correctAnswer: 1,
      explanation: "Attackers deploy rogue routers with familiar names (e.g. 'Airport_WiFi') to trick devices into connecting and routing traffic through the hacker's machine."
    },
    {
      id: "ns-q5",
      category: "Network Security",
      type: "mcq",
      question: "Which wireless security protocol is currently considered the most secure for home and enterprise networks?",
      options: [
        "WEP",
        "WPA",
        "WPA2",
        "WPA3"
      ],
      correctAnswer: 3,
      explanation: "WPA3 is the latest standard, providing stronger handshake encryption and protection against offline dictionary attacks."
    },
    {
      id: "ns-q6",
      category: "Network Security",
      type: "true_false",
      question: "True or False: Firewalls can inspect both incoming traffic from the internet and outgoing traffic originating from inside your network.",
      options: [
        "True — Bi-directional inspection prevents internal malware from communicating with control servers.",
        "False — Firewalls only block external attacks."
      ],
      correctAnswer: 0,
      explanation: "Outbound filtering is critical to block malware bots from initiating outgoing tunnels (reverse shells) to their command servers."
    },
    {
      id: "ns-q7",
      category: "Network Security",
      type: "mcq",
      question: "What does 'HTTPS' indicate in a web address compared to 'HTTP'?",
      options: [
        "The website loads faster.",
        "The site utilizes SSL/TLS to encrypt communication between the browser and server.",
        "The website is hosted in a secure country.",
        "The website is only accessible via VPN."
      ],
      correctAnswer: 1,
      explanation: "HTTPS ensures data confidentiality in transit, preventing network nodes from reading password packets."
    },
    {
      id: "ns-q8",
      category: "Network Security",
      type: "scenario",
      question: "Scenario: You need to log into your online banking account while at an airport terminal. What is the safest connection method?",
      options: [
        "Use your cellular data connection (hotspot) or connect to the airport Wi-Fi with an active VPN tunnel.",
        "Log in directly using the open airport Wi-Fi.",
        "Connect to the network and disable HTTPS to speed up loading.",
        "Wait until someone shares their home password."
      ],
      correctAnswer: 0,
      explanation: "Hotspots or VPN tunnels protect the banking credentials from local packet capture risks."
    }
  ],

  privacy: [
    {
      id: "dp-q1",
      category: "Data Privacy",
      type: "scenario",
      question: "Scenario: You are emailing a spreadsheet containing customer Social Security Numbers to an external auditor. How must this file be handled?",
      options: [
        "Attach the spreadsheet as a normal unencrypted .xlsx file.",
        "Encrypt the file/email payload and send the password out-of-band via a separate channel.",
        "Post the spreadsheet to a public cloud link.",
        "Rename the file to 'Recipes.xlsx' to trick hackers."
      ],
      correctAnswer: 1,
      explanation: "PII (Personally Identifiable Information) must be encrypted at rest and in transit. Encryption keys should never be sent in the same email."
    },
    {
      id: "dp-q2",
      category: "Data Privacy",
      type: "mcq",
      question: "What constitutes PII (Personally Identifiable Information)?",
      options: [
        "Only your credit card numbers.",
        "Any data that can be used to identify, contact, or locate a specific individual.",
        "Public news reports.",
        "Corporate product price lists."
      ],
      correctAnswer: 1,
      explanation: "PII includes names, SSNs, medical histories, IP addresses, biometric signatures, or email accounts."
    },
    {
      id: "dp-q3",
      category: "Data Privacy",
      type: "true_false",
      question: "True or False: Under regulations like GDPR, customers have the right to request that a company delete all their personal data from active databases.",
      options: [
        "True — This is called the 'Right to be Forgotten' or right to erasure.",
        "False — Companies have absolute ownership of client records."
      ],
      correctAnswer: 0,
      explanation: "GDPR mandates that users can request total deletion of their profile details under specific guidelines."
    },
    {
      id: "dp-q4",
      category: "Data Privacy",
      type: "mcq",
      question: "What is data minimization?",
      options: [
        "Shrinking databases to save disk storage.",
        "The practice of collecting and retaining only the personal data necessary to accomplish a specific, declared task.",
        "Deleting client history files every month.",
        "Using smaller data structures in code."
      ],
      correctAnswer: 1,
      explanation: "Data minimization restricts collection targets, reducing target profile values in case of a breach."
    },
    {
      id: "dp-q5",
      category: "Data Privacy",
      type: "scenario",
      question: "Scenario: A client calls requesting to know what specific data your platform has collected about them. Which privacy rule supports this request?",
      options: [
        "HIPAA Security Rule",
        "GDPR/CCPA Access Rights (Subject Access Request)",
        "PCI-DSS audit compliance",
        "DMCA copyright rules"
      ],
      correctAnswer: 1,
      explanation: "Modern privacy acts give users the right to inspect personal data logs kept by companies."
    },
    {
      id: "dp-q6",
      category: "Data Privacy",
      type: "true_false",
      question: "True or False: Encrypting a database file at rest prevents an administrator with root access from reading plain-text customer records.",
      options: [
        "True — Encryption blocks all user accesses.",
        "False — Root administrators with access to the key management service can decrypt and inspect logs."
      ],
      correctAnswer: 1,
      explanation: "At-rest encryption protects database files from external theft (e.g. physical disk theft), but active software access must be managed by role controls."
    },
    {
      id: "dp-q7",
      category: "Data Privacy",
      type: "mcq",
      question: "What is a major compliance consequence of failing to protect Personally Identifiable Information under GDPR guidelines?",
      options: [
        "A verbal warning from inspectors.",
        "Administrative fines of up to 4% of annual global turnover or 20 million Euros.",
        "The immediate closure of company offices.",
        "The deletion of all corporate websites."
      ],
      correctAnswer: 1,
      explanation: "GDPR enforces high penalties for compliance negligence to push companies to prioritize user privacy."
    },
    {
      id: "dp-q8",
      category: "Data Privacy",
      type: "mcq",
      question: "What is the primary objective of Data Classification policies?",
      options: [
        "Sorting files alphabetically.",
        "Assigning security labels (e.g. Confidential, Restricted) to data to ensure it receives appropriate security controls.",
        "Compressing file sizes.",
        "Moving files to offline storage tape arrays."
      ],
      correctAnswer: 1,
      explanation: "Classifying data helps security teams enforce stricter access restrictions (such as MFA protection) on Confidential databases."
    }
  ]
};

// Combine all category question arrays into QUIZ_SUITES.all
QUIZ_SUITES.all = [
  ...QUIZ_SUITES.phishing,
  ...QUIZ_SUITES.passwords,
  ...QUIZ_SUITES.malware,
  ...QUIZ_SUITES.social,
  ...QUIZ_SUITES.network,
  ...QUIZ_SUITES.privacy
];

export const QUIZ_QUESTIONS = QUIZ_SUITES.all;
