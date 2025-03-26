import {Link, useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Home, Info} from "lucide-react";

export const Navigation = () => {
    const location = useLocation();

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border/30 bg-background/80 px-4 py-3 backdrop-blur-md">
            <Link to="/" className="app-logo">
                Prompt<span>Gen</span>
            </Link>

            <div className="flex items-center gap-2">
                <Link to="/">
                    <Button
                        variant={location.pathname === "/" ? "default" : "ghost"}
                        size="sm"
                        className="gap-1"
                    >
                        <Home className="h-4 w-4"/>
                        <span className="hidden sm:inline">Home</span>
                    </Button>
                </Link>

                <Link to="/about">
                    <Button
                        variant={location.pathname === "/about" ? "default" : "ghost"}
                        size="sm"
                        className="gap-1"
                    >
                        <Info className="h-4 w-4"/>
                        <span className="hidden sm:inline">About</span>
                    </Button>
                </Link>
            </div>
        </nav>
    );
};
