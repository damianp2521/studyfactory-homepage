export default function Footer() {
    return (
        <footer id="footer" className="h-full flex flex-col justify-center items-center bg-slate-50 border-t border-slate-200 px-6">
            <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Study Factory</h3>
                <div className="text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} Study Factory. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
