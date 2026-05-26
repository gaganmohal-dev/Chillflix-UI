import React from "react";
import { useState } from "react";

function Footer(){
    return(
        <>
            <footer className="border-t border-[#2a2a2a] bg-[#141414]">
                <div className="max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-10">

                    <p className="text-[#adadad] text-sm mb-8">
                    Questions? Call{" "}
                    <a href="tel:18445052993" className="underline underline-offset-2 hover:text-white transition-colors">
                        1-844-505-2993
                    </a>
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3 mb-10">
                    <ul className="space-y-3">
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Investor Relations</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Privacy</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Speed Test</a></li>
                    </ul>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Jobs</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Cookie Preferences</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Legal Notices</a></li>
                    </ul>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Account</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Ways to Watch</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Corporate Information</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Only on Chillflix</a></li>
                    </ul>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Media Center</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Terms of Use</a></li>
                        <li><a href="#" className="text-[#adadad] text-xs hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                    </div>

                    <div className="mb-6">
                    <button className="flex items-center gap-2 border border-[#555] text-[#adadad] text-xs px-3 py-2 rounded-sm hover:border-[#adadad] hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        English
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                    </div>

                    <p className="text-[#757575] text-xs">Chillflix © 2025</p>

                </div>
            </footer>
        </>
    )
}

export default Footer