import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import styles from "./index.module.css";

const ScrollToTop = () => {
	const scrollToTopRef = useRef(null);
	const { y: pageYOffset } = useWindowScroll();
	const [visible, setVisiblity] = useState(false);

	useEffect(() => {
		if (pageYOffset > 50) {
			setVisiblity(true);
		} else {
			setVisiblity(false);
		}
	}, [pageYOffset]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0 });
	};

	if (!visible) {
		return false;
	}

	return (
		<div
			className={styles.scroll_to_top}
			ref={scrollToTopRef}
			onFocus={() => {
				console.log(scrollToTopRef.current);
			}}
			onClick={scrollToTop}
		>
			<i className="material-icons">keyboard_arrow_up</i>
		</div>
	);
};

export default ScrollToTop;
