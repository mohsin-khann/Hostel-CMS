import jwt from "jsonwebtoken"
//auth 
const auth = async (req, res, next) => {
    try {
        console.log("hit")
        // console.log("Auth middleware hit");
        // console.log("Headers:", req.headers);
        // console.log("Cookies:", req.cookies.token);
        // console.log("Body:", req.body);
        // extract token
        // const token = req.body.token || req.cookies.token || req.headers["authentication"].replace("Bearer ", "");
        const token =
                req.body.token ||
                req.cookies.token ||
                req.headers["authorization"]?.replace("Bearer ", "");

        //verify token 
        console.log("token")
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token does not provided.",
            })
        }

        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            req.user = payload;
            console.log("user",req.user)
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid.",
            })
        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while verifying token.",
            error: error
        })
    }


}

//Ordinary User
const isOrdinary = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Ordinary") {
            return res.status(401).json({
                success: false,
                message: "Protected route for Ordinary.",
            })

        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not an Ordinary User.",
            error: error
        })
    }
}

//admin
const isAdmin = async (req, res, next) => {
    try {
        console.log("hii")
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "Protected route for admin.",
            })

        }
        next();

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            message: "Not an Admin.",
            error: error
        })
    }
}

//Agent
const isAgent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Agent") {
            return res.status(401).json({
                success: false,
                message: "Protected route for agent.",
            })

        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not an Agent.",
            error: error
        })
    }
}

// Warden
const isWarden = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Warden") {
            return res.status(401).json({
                success: false,
                message: "Protected route for Warden.",
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not a Warden.",
            error: error
        })
    }
}

// Employee
const isEmployee = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Employee") {
            return res.status(401).json({
                success: false,
                message: "Protected route for Employee.",
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not an Employee.",
            error: error
        })
    }
}

// Provost
const isProvost = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Provost") {
            return res.status(401).json({
                success: false,
                message: "Protected route for Provost.",
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not a Provost.",
            error: error
        })
    }
}

// Deputy Provost
const isDeputyProvost = async (req, res, next) => {
    try {
        if (req.user.accountType !== "DeputyProvost") {
            return res.status(401).json({
                success: false,
                message: "Protected route for Deputy Provost.",
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not a Deputy Provost.",
            error: error
        })
    }
}

export { auth, isAdmin, isAgent, isOrdinary, isWarden, isEmployee, isProvost, isDeputyProvost };