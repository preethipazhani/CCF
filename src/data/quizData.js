export const QUIZ_SUITES = {
  all: [
    {
      id: 1,
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
      id: 2,
      category: "Password Security",
      type: "true_false",
      question: "True or False: Using a short 8-character password with a special character (e.g., P@ssw0rd) is safer than a 16-character random passphrase (e.g., Purple-Octopus-Coffee!).",
      options: [
        "True - Special characters prevent all cracking.",
        "False - Length is exponentially more effective than simple character substitutions."
      ],
      correctAnswer: 1,
      explanation: "Modern GPU brute-force crackers easily guess common character substitutions (like @ for a). Passphrase length (16+ chars) provides vastly higher entropy."
    },
    {
      id: 3,
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
      id: 4,
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
      id: 5,
      category: "Network Security",
      type: "true_false",
      question: "True or False: Public Wi-Fi networks in coffee shops without password prompts encrypt your network traffic automatically.",
      options: [
        "True - All Wi-Fi signals are encrypted by default.",
        "False - Open public Wi-Fi broadcasts unencrypted traffic that can be sniffed by anyone on the network."
      ],
      correctAnswer: 1,
      explanation: "Open Wi-Fi broadcasts packets in plain air. Always activate an encrypted Virtual Private Network (VPN) when on untrusted public connections."
    },
    {
      id: 6,
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
      id: 7,
      category: "Phishing",
      type: "mcq",
      question: "When inspecting an email link, what is the 'Hover Technique' used for?",
      options: [
        "To make the button text turn blue.",
        "To preview the actual destination URL host before clicking.",
        "To download the email attachment silently.",
        "To automatically report the email to spam."
      ],
      correctAnswer: 1,
      explanation: "Hovering over hyperlinks exposes the underlying destination domain, allowing you to catch typosquatting or malicious redirects."
    },
    {
      id: 8,
      category: "Password Security",
      type: "true_false",
      question: "True or False: Storing your passwords in a dedicated Password Manager is safer than reusing one master password across 20 websites.",
      options: [
        "True - Password Managers store unique 20+ character passwords in an encrypted vault.",
        "False - It is safer to reuse one simple password so you never forget it."
      ],
      correctAnswer: 0,
      explanation: "Cross-site password reuse means a single breach on one website compromises all 20 of your accounts. A password manager eliminates this risk."
    },
    {
      id: 9,
      category: "Malware",
      type: "scenario",
      question: "Scenario: A pop-up on your screen claims 'YOUR COMPUTER IS INFECTED! CALL 1-800-SECURITY IMMEDIATELY.' What should you do?",
      options: [
        "Call the phone number and pay for remote repair.",
        "Close your browser process via Task Manager and do NOT call the number.",
        "Download whatever software the popup recommends.",
        "Turn off your computer monitor and leave it on overnight."
      ],
      correctAnswer: 1,
      explanation: "Tech support scam popups use browser lock scripts to panic users into paying fake technicians or granting remote desktop access."
    },
    {
      id: 10,
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
    }
  ]
};

export const QUIZ_QUESTIONS = QUIZ_SUITES.all;
