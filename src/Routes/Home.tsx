import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	background: black;
	padding-bottom: 200px;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgphoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	font-size: 30px;
	width: 50%;
`;

const Slider = styled.div`
	position: relative;
	top: -100px;
`;

const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	height: 200px;
	font-size: 66px;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	position: absolute;
	width: 100%;
	bottom: 0;
	h4 {
		text-align: center;
		font-size: 18px;
	}
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const BigMovie = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 400px;
`;

const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 20px;
	font-size: 46px;
	position: relative;
	top: -80px;
`;

const BigOverview = styled.p`
	padding: 20px;
	position: relative;
	top: -80px;
	color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
	hidden: {
		x: window.outerWidth + 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 5,
	},
};

const boxVariants = {};

export default function Home() {
	const { data, isLoading } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMovies
	);
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const offset = 6;
	const increaseIndex = () => {
		if (!data) return;
		if (leaving) return;
		setLeaving(true);
		const totalMovies = data?.results.length - 1;
		const maxIndex = Math.floor(totalMovies / offset) - 1;
		setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						onClick={increaseIndex}
						bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
						{leaving}
						{index}
					</Banner>
					<Slider>
						<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
							<Row
								variants={rowVariants}
								initial='hidden'
								animate='visible'
								exit='exit'
								transition={{ type: "linear", ease: "linear", duration: 3 }}
								key={index}
							>
								{data?.results
									.slice(1)
									.slice(offset * index, offset * index + offset)
									.map((movie) => (
										<Box
											variants={boxVariants}
											layoutId={movie.id + ""}
											key={movie.id}
											bgphoto={makeImagePath(movie.backdrop_path, "w500")}
										>
											<Info></Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
				</>
			)}
		</Wrapper>
	);
}
