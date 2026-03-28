const user_model = require('../models/User')

exports.get_tutors = async (req, res) => {
    try{
        const tutors = await user_model.find({role: 'tutor', is_active: true}).select(
            'name experience description price education photo'
        )
        res.status(200).json(tutors)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

exports.get_user = async (req, res) => {
    try {
        const user = await user_model.findById(req.user.id).select('-password')
        
        if (!user) return res.status(404).json({ message: "User not found" })
        
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.update_user = async (req, res) => {
    try{
        const user_id = req.user.id
        const update = req.body
        delete update.email

        const user = await user_model.findById(user_id)
        if (!user) return res.status(404).json({ message: "User not found" })

        if (user.role === 'tutor' && !user.is_active) {
            const has_desc = update.description || user.description;
            const has_price = update.price || user.price;
            const has_exp = update.experience || user.experience;

            if (has_desc && has_price && has_exp) {
                update.is_active = true;
                console.log(`Tutor ${user.name} profile was activated.`);
            }
        }

        const update_user = await user_model.findByIdAndUpdate(
            user_id,
            { $set: update }, 
            { new: true, runValidators: true}
        ).select('-password')

        if (!update_user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json(update_user)
    } catch(error){
        res.status(500).json({message: "Update error", error: error.message})
    }
}