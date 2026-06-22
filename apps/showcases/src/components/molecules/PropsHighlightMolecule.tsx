
import { Badge } from '../ui/badge'
import { motion } from 'framer-motion'

const PropsHighlight = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2 mb-8"
        >
            {["size", "speed", "color", "loadingText"].map((prop) => (
                <Badge key={prop} variant="secondary" className="px-3 py-1">
                    {prop}
                </Badge>
            ))}
            <Badge variant="outline" className="px-3 py-1">
                + unique props per loader
            </Badge>
        </motion.div>
    )
}

export default PropsHighlight