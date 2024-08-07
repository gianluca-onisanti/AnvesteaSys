import { Box } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {

    const {
        children,
        value,
        index
    } = props;

    return (
        <div hidden={value !== index}>
            {value === index && (
            <Box>
                {children}
            </Box>
            )}
        </div>
    );
}

export default TabPanel