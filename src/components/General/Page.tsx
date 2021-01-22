import React, {FC, useEffect} from 'react';

type Props = {
    title: string
}

export const Page: FC<Props> = ({ title, children, ...props }) => {
    useEffect(() => { document.title = title }, []);

    return (
        <div {...props}>
            {children}
        </div>
    )
};