// "use client";

// import { motion } from "framer-motion";

// const days = [
//     { day: "Day 1", date: "March 15", image: "/events/day1.png", events: ["Inauguration", "Street Dance", "Hackathon Starts", "Model United Nations"], color: "from-red-500 to-orange-500" },
//     { day: "Day 2", date: "March 16", image: "/events/day2.png", events: ["Fashion Show", "Rock Night", "Robo Wars", "Gaming Finals"], color: "from-blue-500 to-cyan-500" },
//     { day: "Day 3", date: "March 17", image: "/events/day3.png", events: ["Celebrity Night", "Award Ceremony", "Start-up Expo", "Closing Concert"], color: "from-purple-500 to-pink-500" },
// ];

// export default function EventTimeline() {
//     return (
//         <section className="py-20 bg-black relative">
//             <div className="container mx-auto px-4 bg-black">
//                 <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
//                     Festival <span className="text-transparent bg-clip-text bg-black from-blue-400 to-green-400">Timeline</span>
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {days.map((item, index) => (
//                         <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 50 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.2 }}
//                             viewport={{ once: true }}
//                             className={`relative bg-gradient-to-b ${item.color} p-[1px] rounded-2xl`}
//                         >
//                             <div
//                                 className="bg-black/90 h-full rounded-2xl p-8 hover:bg-black/80 transition-colors bg-cover bg-center"
//                                 style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.8)), url(${item.image})` }}
//                             >
//                                 <div className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color} mb-2`}>
//                                     {item.day}
//                                 </div>
//                                 <div className="text-xl text-white/60 mb-6">{item.date}</div>

//                                 <ul className="space-y-4">
//                                     {item.events.map((event, i) => (
//                                         <li key={i} className="flex items-center gap-3 text-gray-300">
//                                             <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}></span>
//                                             {event}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
