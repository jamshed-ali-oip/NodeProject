
import User from "../model/User.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create({
            firstName, lastName, email, password: hashedPassword
        }).then((data) => {

            res.status(200).send({
                message: "User created successfully",
                success: true,
                data: {
                    data
                }
            })
        }).catch((error) => {
            let message = null;
            if (error.errors) {
                const errorKeys = Object?.keys(error.errors);
                message = errorKeys.map((er) => {
                    const data = error.errors[er]?.message
                    return data;
                });
            } else {
                message = error.message
            }

            res.status(400).send({
                message,
                success: false
            })
        });

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            success: false
        })
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({
            _id: id
        }).select({ password: false })

        if (!user) {
            return res.status(404).send({
                message: "user not found"
            })
        };

        res.status(200).send({
            succses: true,
            message: "data fetch succesfully",
            data: user
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const updateUserById = async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, password } = req.body
    try {
        const user = await User.findOneAndUpdate({ _id: id }, {
            $set: {
                firstName,
                lastName,
                email,
                password
            },

        }, { new: true })
        if (!user) {
            res.status(404).send({ message: "User Not found" })
        } else {
            res.status(200).send({
                success: true,
                message: "User updated successfully",
                data: user
            })
        }


    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.deleteOne({ _id: id })
        if (!user) {
            res.status(404).send({
                message: "User not found! "
            })
        } else {
            res.status(200).send({
                success: true,
                message: "User deleted successfully"
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }

}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({
                message: "email does not exist!"
            })
        }
        const isVerified = await bcrypt.compare(password, user.password);
        if (!isVerified) {
            res.status(400).send({
                message: "password doest not match"
            })
        } else {
            res.status(200).send({
                success: true,
                message: "User login Successfully",
                data: user

            })
        }

    } catch (error) {

    }
}
