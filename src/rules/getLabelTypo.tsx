import { Typography } from "@mui/material";

export default function getLabelTypo(text : string, size? : 'small' | 'normal' | 'normal') {
    return <Typography variant={size === 'small' ? 'body2' : 'body1'} fontWeight='bold'>{text}</Typography>
}