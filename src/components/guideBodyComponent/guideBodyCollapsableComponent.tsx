import React, { useState } from 'react'
import { animated, useSpring } from '@react-spring/web';
import { styled } from '@mui/material/styles';
import useMeasure from 'react-use-measure'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const PREFIX = 'GuideBody';

const classes = {
    panel: `${PREFIX}-panel`,
    panelHeading: `${PREFIX}-panelHeading`,
    panelContent: `${PREFIX}-panelContent`,
    panelContentInner: `${PREFIX}-panelContentInner`,
};

const Panel = styled('div')(() => ({
    [`&.${classes.panel}`]: {
        width: "auto",
        textAlign: "left"
    },

    [`& .${classes.panelHeading}`]: {
        padding: "1em 0",
        display: "flex",
        alginItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        height: "auto",
    },

    [`& .${classes.panelContent}`]: {
        overflow: "hidden",
    },

    [`& .${classes.panelContentInner}`]: {
        padding: ".5em 0",
    },
}));

export interface GuideBodyCollapsablePanelComponentProps {
    title: string;
    contents: any
}

export const GuideBodyCollapsablePanelComponent = (props: GuideBodyCollapsablePanelComponentProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [ref, bounds] = useMeasure();

  const toggleWrapperAnimatedStyle = useSpring({ transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'});
  const panelContentAnimatedStyle = useSpring({
    height: isCollapsed ? 0 : bounds.height
  });

  const togglePanel = () => {
    setIsCollapsed(prevState => !prevState)
  };

  return (
    <Panel className={classes.panel}>
      <div className={classes.panelHeading} onClick={togglePanel}>
        <strong>
            {props.title}
        </strong>
        <animated.div style={toggleWrapperAnimatedStyle}>
            <FontAwesomeIcon icon={faChevronCircleDown} />
        </animated.div>
      </div>
      <animated.div className={classes.panelContent} style={panelContentAnimatedStyle}>
        <div className={classes.panelContentInner} ref={ref}>
          {props.contents}
        </div>
      </animated.div>
    </Panel>
  )
};