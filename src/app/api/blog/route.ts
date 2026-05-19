import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";

const initialSeedPosts = [
  {
    title: "The Art of Minimalist Living: Curating Space for Peace",
    category: "Interior Design",
    date: "May 18, 2026",
    readTime: "6 min read",
    excerpt: "Learn how the intersection of Japanese minimalism and Scandinavian functionality creates the perfect canvas for tranquil modern living.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop",
    content: "In a world filled with continuous noise, our homes must serve as sanctuaries of silence and peace. The fusion of Japanese minimalism (Wabi-Sabi) and Scandinavian design (Hygge)—warmly known as Japandi—presents a masterclass in intentional curation.\n\nMinimalism is not about living with nothing; it is about living only with items that possess deep meaning or utility. When designing a minimalist lounge, start with a statement low-profile sofa. The low posture brings you closer to the earth, creating an immediate feeling of stability and peace.\n\nIncorporate raw, untreated timber elements. The visible knots and grain lines remind us of nature's beauty and imperfection. Keep color palettes warm and natural: alabaster, stone, pale clay, and warm oak. Let natural light act as your primary artwork, shifting cast shadows slowly across your walls as the day passes."
  },
  {
    title: "Choosing the Perfect Walnut Finish: A Craftsman's Guide",
    category: "Craftsmanship",
    date: "May 15, 2026",
    readTime: "8 min read",
    excerpt: "Delve deep into the world of American Black Walnut. Explore natural oil rubs, matte poly finishes, and how light changes walnut hues.",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20d25b5?q=80&w=600&auto=format&fit=crop",
    content: "American Black Walnut is arguably the king of cabinetmaking timbers. Its deep chocolate hues, paired with dramatic golden sapwood streaks, make it a natural masterpiece. However, selecting the wrong finish can easily ruin its organic grandeur.\n\nFor a truly tactile experience, we champion hand-rubbed Danish or Tung oils. These oils sink deep into the grain pores instead of building up a thick, plasticky film. The wood remains warm to the touch, and over time it develops an exquisite amber patina.\n\nIf you require high durability for dining tables or active spaces, look towards ultra-matte water-based acrylic polyurethanes. They protect the timber against water rings and scratches while maintaining an invisible 5% sheen level, preserving the natural raw appearance of the raw walnut."
  },
  {
    title: "The Rise of Warm Neutrals in Modern Penthouses",
    category: "Color Theory",
    date: "May 10, 2026",
    readTime: "5 min read",
    excerpt: "Cold, stark greys are officially behind us. Step into the world of rich alabasters, soft sand, and warm ochre accents.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=600&auto=format&fit=crop",
    content: "The clinical 'white cube' aesthetic is giving way to a much softer, more inviting design era. Penthouses from Tokyo to New York are wrapping themselves in layers of warm neutrals to evoke comfort and refined luxury.\n\nCold concrete-greys are being replaced by plaster finishes, Roman clay, and dynamic limewash textures. Limewash reflects light in a beautifully scattered, matte pattern, adding structural depth to flat surfaces.\n\nTo style warm neutral walls, layer textures instead of colors. Combine a soft off-white bouclé armchair, a natural linen drapery, and a raw ivory travertine coffee table. This keeps the monochromatic space feeling alive, organic, and incredibly premium."
  },
  {
    title: "Behind the Stitch: Leather Sourcing in Florence",
    category: "Materials",
    date: "May 08, 2026",
    readTime: "7 min read",
    excerpt: "Step inside our partner tanneries in Tuscany to learn why full-grain aniline leather is the ultimate upholstery luxury.",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=600&auto=format&fit=crop",
    content: "True luxury cannot be manufactured synthetically; it must be raised, tanned, and crafted with generation-spanning heritage. Our full-grain aniline leather is sourced from a historic family-owned tannery tucked away along the Arno river in Florence.\n\nUnlike corrected-grain leathers, which are sanded down and heavily stamped with plastic patterns, aniline leather is dyed purely with transparent soluble dyes. Every stretch mark, scar, and bite tells the story of the animal's life, making each upholstered chair 100% unique.\n\nThis natural finish allows the leather pores to breathe, adjusting instantly to your body temperature. With time, high-touch areas absorb natural body oils, polishing the leather into a spectacular glossy, rich caramel patina."
  },
  {
    title: "Lighting Your Masterpiece: Balancing Shadows and Warmth",
    category: "Interior Design",
    date: "May 02, 2026",
    readTime: "6 min read",
    excerpt: "How to use layered lighting, warm 2700K fixtures, and indirect architectural channels to elevate your furniture's natural timber grain.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop",
    content: "A beautiful lounge room can look cold and flat if it is flooded with bright, overhead white lights. Lighting is the invisible brush that paints shadows and adds depth to high-end furnishings.\n\nAlways follow the golden rule of layered lighting: Ambient, Task, and Accent. Avoid recessed downlights directly over seating. Instead, wash walls with warm 2700K LED strip lights hidden in architectural coves. This bounces light softly downward, mimicking sunset rays.\n\nUse low-level accent lamps with parchment or alabaster shades on walnut sideboards. The diffuse light highlights the intricate grain lines of the wood and casts beautiful, soft shadows that make the space feel immensely cozy and premium."
  },
  {
    title: "The Psychology of Premium Seating: Ergonomics & Style",
    category: "Ergonomics",
    date: "Apr 28, 2026",
    readTime: "5 min read",
    excerpt: "Unpack the engineering secrets of lounge chairs. Discover how frame angles and multi-density foam cushions elevate comfort.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop",
    content: "A lounge chair should never demand that you adjust to it; it must gracefully adjust to you. Premium seating is an intricate dance between anatomical engineering and visual beauty.\n\nThe angle of the seat-to-back tilt is critical. For active conversation, a 95-degree angle is preferred. For lounge and reflection, a 105-to-110-degree tilt opens up the diaphragm, distributing body weight evenly across the hips and lower back.\n\nOur cushions are stuffed with multi-density high-resilient foam, wrapped in a generous layer of natural goose down feathers. The foam core provides lifetime structural support, while the outer down layer offers that luxurious, clouds-like sink-in feeling."
  },
  {
    title: "Architectural Symphony: Designing Open-Concept Salons",
    category: "Interior Design",
    date: "Apr 24, 2026",
    readTime: "7 min read",
    excerpt: "Discover how to define distinct living zones using low-slung credenzas, custom rugs, and dynamic furniture groupings.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&auto=format&fit=crop",
    content: "While open-concept living spaces provide beautiful vistas and airy volume, they often suffer from a lack of focus and conversational intimacy. The solution is creating distinct zones without adding physical walls.\n\nStart by using low-slung, floating furniture arrangements. Anchor your main lounge with an oversized, custom wool rug—ensure all furniture legs rest comfortably on it to define the lounge boundary.\n\nPosition a premium walnut credenza behind your sofa. This serves a double purpose: it hides the back of the sofa carcass from the dining room, offers storage, and acts as a beautiful styling shelf for ceramics, maintaining sightlines while organizing the layout."
  },
  {
    title: "Restoring Legacy Furniture: Preservation vs Modernization",
    category: "Craftsmanship",
    date: "Apr 20, 2026",
    readTime: "9 min read",
    excerpt: "Learn the secrets of restoring vintage mid-century icons. Understand when to preserve original finishes and when to rebuild.",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=600&auto=format&fit=crop",
    content: "Historic craftsmanship has a soul that must be treated with reverence. When restoring a vintage timber piece, the golden rule is: preserve as much of the original character as safely possible.\n\nAvoid harsh industrial chemical strippers that bleach timber. Instead, carefully wash away accumulated wax and dirt with mineral spirits. Rub down scratches using natural walnut kernels, which release natural, wood-matching oils.\n\nIf the original lacquer is completely deteriorated, finish the piece with thin coats of dewaxed shellac or natural beeswaxes. The goal is to highlight the vintage history and patina of the wood rather than making it look like a plastic replica."
  },
  {
    title: "Curating the Perfect Entrance: Luxury Foyer Design",
    category: "Interior Design",
    date: "Apr 15, 2026",
    readTime: "5 min read",
    excerpt: "Create a memorable first impression with statement console tables, sculptural mirrors, and layered accent textures.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    content: "Your entrance foyer dictates the entire sensory transition from the busy outside world to the quiet comfort of your home. It should feel like a luxurious, warm embrace.\n\nAlways start with a focal statement piece, such as a narrow solid-wood console table with clean geometric lines. Pair it with an oversized brass or black-framed sculptural mirror to catch light and double the visual space.\n\nLayer accessories in groups of three with varied heights: a tall ceramic vase with olive branches, a medium-sized art book, and a small brass tray for keys. This sets a sophisticated, balanced tone right at your doorstep."
  },
  {
    title: "Sustainable Luxury: Ethical Timber in Northern Europe",
    category: "Materials",
    date: "Apr 11, 2026",
    readTime: "6 min read",
    excerpt: "Discover why our commitment to FSC-certified oak and ash keeps our premium furniture eco-friendly and legacy-ready.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
    content: "In the modern era, true luxury must carry a clean conscience. High-end design should not come at the cost of global forest depletion.\n\nWe source our prime white oak and ash timber from carefully monitored, FSC-certified forests in Germany and Sweden. For every single mature tree harvested for our collection, three young saplings are planted in its place.\n\nThese slow-grown northern timbers have incredibly tight growth rings, giving the wood unparalleled density and durability. By focusing on circular sourcing and zero-waste workshops, we build furniture that lasts for generations while keeping our planet green."
  },
  {
    title: "The Velvet Revival: Incorporating Rich Jewel Textures",
    category: "Color Theory",
    date: "Apr 05, 2026",
    readTime: "6 min read",
    excerpt: "Plush, heavy velvets are back. Learn how to style emerald, mustard, and deep navy without overcrowding your minimalist layout.",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=600&auto=format&fit=crop",
    content: "Velvet is the ultimate fabric of romance and tactile richness. After years of rough, heavy linens, we are seeing a massive resurgence of premium, high-pile cotton velvets in contemporary salons.\n\nThe secret to styling velvet is balance. Velvet reflects light in a beautiful, changing shimmer. Pair a bold, emerald velvet armchair with a dark matte-black steel floor lamp and a raw, light oak side table. The raw, rough texture of the timber balances the plushness of the fabric.\n\nStick to jewel tones that feel rich yet natural: olive green, rusted terracotta, burnt mustard, and deep navy. These hues bring sophisticated warmth to neutral walls without feeling chaotic."
  },
  {
    title: "Bespoke Tailoring: The Custom Furniture Journey",
    category: "Craftsmanship",
    date: "Mar 29, 2026",
    readTime: "7 min read",
    excerpt: "Step behind the scenes. From initial architectural drawings to dry-fitting and custom premium hand-finishing.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop",
    content: "A bespoke piece of furniture is a tangible realization of a client's unique aesthetic vision. The journey begins with deep collaborative dialogues and detailed hand-sketches.\n\nOnce the concept is finalized, our master woodworkers select matching boards from the same log. This guarantees that all grain patterns and natural color variations flow seamlessly across the entire finished piece.\n\nEvery joint is carved using traditional mortise-and-tenon or dovetail joinery. Before final oiling, the piece is dry-fitted and inspected under directional raking lights to ensure absolute, pixel-perfect structural alignment."
  },
  {
    title: "Mastering Monochromatic Palettes: Travertine & Linen",
    category: "Color Theory",
    date: "Mar 25, 2026",
    readTime: "5 min read",
    excerpt: "How to use varied material depths like bouclé, linen, and raw ivory travertine to create an organic, bright monochromatic space.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop",
    content: "Designing a single-tone room is deceptively difficult. Without a rigorous, expert approach to texture, a monochromatic neutral room will end up looking flat, cold, and boring.\n\nThe trick lies in using materials with drastically different light-absorption properties. A rough, looped-bouclé armchair absorbs light, creating tiny micro-shadows. A smooth, matte travertine coffee table reflects light softly. Natural linen curtains scatter light dynamically.\n\nBy layering these distinct tactile surfaces—bouclé, linen, travertine, and perhaps brushed brass details—you create visual movement and premium warmth using a single tone."
  },
  {
    title: "The Dining Table as the Anchor: Designing Social Hubs",
    category: "Interior Design",
    date: "Mar 19, 2026",
    readTime: "6 min read",
    excerpt: "Explore the ideal dining table dimensions, clearance rules, and wood selection for hosting memorable gatherings.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1c094ddcb?q=80&w=600&auto=format&fit=crop",
    content: "The dining table is more than a place to eat; it is the emotional hearth of the modern home. It is where stories are shared and legacy memories are made.\n\nWhen selecting a table, always prioritize guest comfort. Ensure a minimum of 24 inches of width per person at the table, and at least 36 inches of clearance between the table edge and the wall for easy movement.\n\nSolid white oak and European ash are outstanding timbers for dining tables due to their incredible fiber strength. Our tables feature a thick timber top with subtle chamfered edges, which visually softens the structural heft while keeping it incredibly robust."
  },
  {
    title: "Japandi Design: The Perfect Fusion of East and West",
    category: "Interior Design",
    date: "Mar 12, 2026",
    readTime: "7 min read",
    excerpt: "An in-depth look at Wabi-Sabi textures paired with Nordic functional layouts to create peaceful residential escapes.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    content: "Japandi is not just a styling trend; it is a profound philosophical alignment of two distinct cultures that share a deep respect for simplicity, natural materials, and craft.\n\nScandinavian design brings clean functional layout, practical lighting, and cold-climate comfort. Japanese design brings organic, natural materials, raw textures, and an appreciation for the beauty of aging.\n\nTo incorporate Japandi style, declutter your sightlines. Choose low-profile solid-oak seating upholstered in natural oatmeal linen. Introduce black accent pieces—like a blackened ash sideboard or slate ceramics—to provide structural contrast without disrupting the peace."
  },
  {
    title: "The Bedroom Sanctuary: Crafting Restful Master Suites",
    category: "Interior Design",
    date: "Mar 05, 2026",
    readTime: "6 min read",
    excerpt: "From sound-absorbing upholstered headboards to organic linen bedding and low-temp architectural lighting.",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=600&auto=format&fit=crop",
    content: "Your master bedroom should be an exclusive sanctuary completely shielded from the visual noise of daily life. It should immediately signal your nervous system to calm down.\n\nStart with the bed frame as the central focal point. An upholstered headboard in high-texture, sound-absorbing wool or linen helps create a quiet acoustic pocket. Keep bedside tables clear of clutter, featuring integrated drawer storage.\n\nInstall soft, indirect LED warm-dim lighting behind the headboard or under the bedside units. Avoid central overhead lights completely. Instead, rely on soft amber glows that support natural sleep cycles."
  },
  {
    title: "Mid-Century Modern in 2026: The Classic Evolution",
    category: "Trends",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    excerpt: "Classic Danish design is evolving. Discover how slimmed-down frames and sustainable composite joinery are modernizing MCM icons.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&auto=format&fit=crop",
    content: "The mid-century modern aesthetic has proven its timelessness. In 2026, we are witnessing a beautiful, smart evolution of these classic design shapes.\n\nRather than strictly copying 1950s layouts, modern designers are streamlining profiles even further. Heavy, dark teak frames are making way for lighter sustainably harvested European ash and white-waxed oak.\n\nJoinery techniques have also leaped forward. Master craftsmen are combining traditional mortise-and-tenon joints with eco-friendly natural resins, ensuring vintage profiles remain structurally sound for decades of modern living."
  },
  {
    title: "Designing with Bouclé: Elegance or Passing Trend?",
    category: "Materials",
    date: "Feb 22, 2026",
    readTime: "6 min read",
    excerpt: "A deep dive into looped-pile fabrics. Learn how to style bouclé textures alongside heavy, dark timbers for high contrast.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
    content: "Bouclé fabric—distinguished by its characteristic loops of curled fibers—has dominated high-end upholstery showrooms for several seasons. Is it here to stay?\n\nOriginally popularized by Coco Chanel in fashion, bouclé brings an incredible visual softness and warmth to clean, hard-lined architectural spaces. Its natural texture diffuses bright sunlight beautifully.\n\nTo ensure your bouclé items stand the test of time, pair them with dark, heavy timbers like charcoal oak or dark walnut. The contrast prevents the bouclé from looking like a passing trend, cementing it as a luxurious design choice."
  },
  {
    title: "The Power of Rugs: Scaling Your Lounge Correctly",
    category: "Interior Design",
    date: "Feb 15, 2026",
    readTime: "5 min read",
    excerpt: "Avoid the 'floating postage stamp' rug mistake. Master the dimensions and material selection for high-end lounge layouts.",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=600&auto=format&fit=crop",
    content: "The most common design mistake in modern living rooms is choosing an undersized rug. A small rug makes the entire room feel cramped, unorganized, and cheap.\n\nAlways aim for the 'all legs on deck' rule. Your sofa, armchairs, and side tables should have all their legs resting on the rug surface. If space is tight, ensure at least the front legs of all seating are anchored on the rug.\n\nFor materials, nothing compares to high-twist New Zealand wool blended with pure silk. Wool offers natural bounce-back and soil resistance, while silk catches the light, adding a gorgeous, subtle luster to your lounge room floor."
  },
  {
    title: "Outdoor Refinement: Elevating Patios with Teak",
    category: "Interior Design",
    date: "Feb 08, 2026",
    readTime: "6 min read",
    excerpt: "Design a luxury outdoor oasis. Learn how weathered silver teak and textured travertine create a high-end natural patio.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    content: "Our outdoor spaces should be treated with the exact same level of detail and luxury styling as our indoor salons. A true home extends gracefully past the glass doors.\n\nThe ultimate outdoor timber is Grade-A Indonesian Teak. High in natural rubber and oils, it naturally resists rot, insects, and water without needing chemical sealants. Left untreated, teak weathers into an exquisite, soft silver-grey patina.\n\nAnchor your outdoor lounge with a natural, unfilled travertine stone top table. The organic, pitted surface of the travertine pairs beautifully with the silver teak, creating a highly premium, resort-like look on your patio."
  }
];

export async function GET() {
  try {
    await connectDB();
    let posts = await BlogPost.find({}).sort({ createdAt: -1 });
    
    // Auto-seed if database collection is empty
    if (posts.length === 0) {
      await BlogPost.insertMany(initialSeedPosts);
      posts = await BlogPost.find({}).sort({ createdAt: -1 });
    }
    
    return NextResponse.json({ success: true, data: posts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.title || !body.category || !body.content || !body.excerpt || !body.image) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    
    const formattedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
    
    const words = body.content.split(/\s+/).length;
    const readTimeMin = Math.max(1, Math.ceil(words / 200));
    
    const newPost = await BlogPost.create({
      title: body.title,
      category: body.category,
      date: formattedDate,
      readTime: `${readTimeMin} min read`,
      excerpt: body.excerpt,
      content: body.content,
      image: body.image || "https://images.unsplash.com/photo-1540574163026-643ea20d25b5",
    });
    
    return NextResponse.json({ success: true, data: newPost });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
