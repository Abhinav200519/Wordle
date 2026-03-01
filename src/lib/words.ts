// Common 5-letter words for validation
const VALID_WORDS = new Set([
  "about","above","abuse","actor","acute","admit","adopt","adult","after","again",
  "agent","agree","ahead","alarm","album","alert","alien","align","alive","alley",
  "allow","alone","along","alter","among","angel","anger","angle","angry","anime",
  "ankle","annex","apart","apple","apply","arena","argue","arise","armor","army",
  "aroma","array","arrow","aside","asset","atlas","attic","audio","audit","avoid",
  "awake","award","aware","awful","bacon","badge","badly","baker","basic","basin",
  "basis","batch","beach","beard","beast","begin","being","below","bench","bible",
  "birth","black","blade","blame","bland","blank","blast","blaze","bleed","blend",
  "bless","blind","block","blood","bloom","blown","blues","bluff","blunt","board",
  "boast","bonus","booth","bound","brain","brand","brave","bread","break","breed",
  "brick","bride","brief","bring","broad","broke","brown","brush","buddy","build",
  "bunch","burst","buyer","cabin","cable","camel","candy","cargo","carry","catch",
  "cause","cease","chain","chair","chalk","chaos","charm","chart","chase","cheap",
  "check","cheek","cheer","chess","chest","chief","child","china","chunk","chunk",
  "civic","civil","claim","clash","class","clean","clear","clerk","click","cliff",
  "climb","cling","clock","clone","close","cloth","cloud","coach","coast","color",
  "comet","comic","coral","couch","could","count","court","cover","crack","craft",
  "crane","crash","crazy","cream","crest","crime","crisp","cross","crowd","crown",
  "crude","crush","curve","cycle","daddy","daily","dairy","dance","death","debut",
  "decay","delay","delta","dense","depth","derby","devil","diary","dirty","ditch",
  "dizzy","donor","doubt","dough","draft","drain","drama","drank","drawn","dread",
  "dream","dress","dried","drift","drill","drink","drive","drone","drove","drown",
  "dying","eager","early","earth","eight","elder","elect","elite","embed","empty",
  "enemy","enjoy","enter","entry","equal","error","essay","event","every","exact",
  "exams","exile","exist","extra","faint","fairy","faith","false","fancy","fatal",
  "fault","feast","fence","ferry","fever","fiber","field","fiery","fifth","fifty",
  "fight","final","first","fixed","flame","flash","fleet","flesh","float","flood",
  "floor","flour","flown","fluid","fluke","flung","flush","flute","focal","focus",
  "force","forge","forth","forum","found","frame","frank","fraud","fresh","front",
  "frost","froze","fruit","fully","funny","ghost","giant","given","glass","globe",
  "gloom","glory","gloss","glove","going","grace","grade","grain","grand","grant",
  "graph","grasp","grass","grave","great","green","greet","grief","grill","grind",
  "grip","gross","group","grove","grown","guard","guess","guest","guide","guild",
  "guilt","given","glass","globe","grace","grade","grain","grand","grant","graph",
  "happy","harsh","haven","heard","heart","heavy","hedge","hence","herbs","hoist",
  "honey","honor","horse","hotel","house","human","humor","hurry","hyper","ideal",
  "image","imply","index","indie","inner","input","intel","inter","intro","issue",
  "ivory","jewel","joint","joker","judge","juice","jumbo","karma","kayak","kebab",
  "knife","knock","known","label","labor","large","laser","later","laugh","layer",
  "leads","learn","lease","least","leave","legal","lemon","level","light","limit",
  "linen","liver","local","lodge","logic","login","loose","lover","lower","loyal",
  "lucky","lunar","lunch","lying","magic","major","maker","manor","maple","march",
  "match","mayor","media","mercy","merit","metal","meter","midst","might","minor",
  "minus","mixer","model","money","month","moral","motor","mount","mouse","mouth",
  "moved","movie","muddy","music","named","nasty","naval","nerve","never","newly",
  "night","noble","noise","north","noted","novel","nurse","occur","ocean","offer",
  "often","olive","onset","opera","orbit","order","other","outer","owner","oxide",
  "ozone","paint","panel","panic","paper","party","paste","patch","pause","peace",
  "peach","pearl","penny","perch","phase","phone","photo","piano","piece","pilot",
  "pitch","pixel","pizza","place","plain","plane","plant","plate","plaza","plead",
  "pluck","point","polar","porch","pound","power","press","price","pride","prime",
  "prince","print","prior","probe","prone","proof","proud","prove","proxy","pulse",
  "punch","pupil","purse","queen","query","quest","queue","quick","quiet","quite",
  "quota","quote","radar","radio","raise","rally","ranch","range","rapid","ratio",
  "reach","react","ready","realm","rebel","refer","reign","relax","relay","renal",
  "renew","repay","reply","reset","rider","ridge","rifle","right","rigid","risky",
  "rival","river","robin","robot","rocky","roger","rogue","roman","roost","rough",
  "round","route","royal","rugby","ruler","rural","sadly","saint","salad","scale",
  "scare","scene","scope","score","screw","sense","serve","setup","seven","shade",
  "shall","shame","shape","share","shark","sharp","sheep","sheer","sheet","shelf",
  "shell","shift","shine","shirt","shock","shoot","shore","short","shout","shown",
  "sight","since","sixth","sixty","sized","skill","skull","slash","slate","slave",
  "sleep","slice","slide","slope","small","smart","smell","smile","smoke","snake",
  "solar","solid","solve","sorry","sound","south","space","spare","speak","speed",
  "spend","spent","spice","spine","spite","split","spoke","spoon","sport","spray",
  "squad","stack","staff","stage","stain","stake","stale","stall","stamp","stand",
  "stare","start","state","stays","steak","steal","steam","steel","steep","steer",
  "stern","stick","stiff","still","stock","stole","stone","stood","store","storm",
  "story","stove","strip","stuck","study","stuff","style","sugar","suite","sunny",
  "super","surge","swamp","swear","sweep","sweet","swept","swift","swing","swipe",
  "sword","swore","sworn","taste","teach","teeth","tempo","tense","terms","theft",
  "their","theme","there","thick","thing","think","third","those","three","throw",
  "thumb","tidal","tiger","tight","timer","tired","title","today","token","topic",
  "total","touch","tough","towel","tower","toxic","trace","track","trade","trail",
  "train","trait","trash","treat","trend","trial","tribe","trick","tried","troop",
  "truck","truly","trump","trunk","trust","truth","tumor","tuner","twice","twist",
  "tying","ultra","uncle","under","union","unite","unity","until","upper","upset",
  "urban","usage","usual","valid","value","valve","vault","venue","verse","video",
  "vigor","viral","virus","visit","visual","vital","vivid","vocal","voice","voter",
  "wage","waist","waste","watch","water","weary","weave","weird","whale","wheat",
  "wheel","where","which","while","white","whole","whose","widow","width","witch",
  "woman","woods","world","worry","worse","worst","worth","would","wound","wrath",
  "write","wrong","wrote","yacht","yield","young","yours","youth","zebra"
]);

export function isValidWord(word: string): boolean {
  return VALID_WORDS.has(word.toLowerCase());
}

export async function fetchRandomWord(): Promise<string> {
  const API_KEY = "AIzaSyDKjK8upjI-GwY1efyXvDVvYyifpTagAEc";
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Give me exactly one common English 5-letter word. Only respond with the word itself in uppercase, nothing else. No punctuation, no explanation."
            }]
          }],
          generationConfig: {
            temperature: 1.5,
            maxOutputTokens: 10,
          }
        }),
      }
    );
    const data = await response.json();
    const word = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toUpperCase();
    if (word && word.length === 5 && /^[A-Z]+$/.test(word)) {
      return word;
    }
  } catch (e) {
    console.error("Gemini API error:", e);
  }
  // Fallback: pick from local list
  const words = Array.from(VALID_WORDS);
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}
