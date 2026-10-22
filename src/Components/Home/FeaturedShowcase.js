import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Button from '../UI/Button/Button';
import speakerZX9 from '../../assets/home/desktop/image-speaker-zx9.png';
import { Reveal, RevealItem } from '../Animations/FadeInElement';
import useMediaQuery from '../Animations/useMediaQuery';
import { clipReveal, viewportOnce } from '../Animations/motion';
import styles from './FeaturedShowcase.module.scss';

const PANELS = 3;

const ZX9Card = ({ onSelect, entry, track }) => {
  const ref = useRef(null);
  const { scrollYProgress: own } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const progress = entry || own;

  const ring1 = useTransform(progress, [0, 0.7], [0.3, 1]);
  const ring2 = useTransform(progress, [0.1, 0.85], [0.3, 1]);
  const ring3 = useTransform(progress, [0.2, 1], [0.3, 1]);
  const speakerScale = useTransform(progress, [0, 1], [0.85, 1]);
  const speakerY = useTransform(progress, [0, 1], [60, 0]);
  const idle = useMotionValue(0);
  const speakerX = useTransform(track || idle, [0, 0.5], [0, track ? -120 : 0]);

  return (
    <div ref={ref} className={`${styles.card} ${styles.zx9}`}>
      <span className={styles.circles}>
        <motion.span style={{ scale: ring1 }} />
        <motion.span style={{ scale: ring2 }} />
        <motion.span style={{ scale: ring3 }} />
      </span>
      <motion.div className={styles.zx9Image} style={{ scale: speakerScale, y: speakerY, x: speakerX }}>
        <img src={speakerZX9} alt='ZX9 speaker' />
      </motion.div>
      <Reveal stagger={0.1} className={styles.zx9Title}>
        <RevealItem as='h1'>ZX9 SPEAKER</RevealItem>
        <RevealItem as='p'>{'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.'}</RevealItem>
        <RevealItem>
          <Button type='three' onClick={() => onSelect('zx9-speaker')}>See product</Button>
        </RevealItem>
      </Reveal>
    </div>
  );
};

ZX9Card.propTypes = {
  onSelect: PropTypes.func.isRequired,
  entry: PropTypes.object,
  track: PropTypes.object,
};

const ZX7Card = ({ onSelect, track, range }) => {
  const idle = useMotionValue(0.5);
  const bgX = useTransform(track || idle, range, ['6%', '-6%']);
  const titleX = useTransform(track || idle, range, [track ? 160 : 0, track ? -160 : 0]);

  return (
    <div className={`${styles.card} ${styles.zx7}`}>
      <motion.div className={styles.zx7Bg} style={{ x: bgX }} />
      <motion.div className={styles.zx7Title} style={{ x: titleX }}>
        <Reveal stagger={0.1}>
          <RevealItem as='h4'>ZX7 SPEAKER</RevealItem>
          <RevealItem>
            <Button type='two' onClick={() => onSelect('zx7-speaker')}>See product</Button>
          </RevealItem>
        </Reveal>
      </motion.div>
    </div>
  );
};

ZX7Card.propTypes = {
  onSelect: PropTypes.func.isRequired,
  track: PropTypes.object,
  range: PropTypes.array.isRequired,
};

const YX1Card = ({ onSelect, track, range }) => {
  const idle = useMotionValue(0.5);
  const imgX = useTransform(track || idle, range, ['6%', '-6%']);
  const infoX = useTransform(track || idle, range, [track ? 200 : 0, 0]);

  return (
    <motion.div className={`${styles.card} ${styles.yx1}`} initial='hidden' whileInView='visible' viewport={viewportOnce}>
      <motion.div variants={clipReveal} className={styles.yx1Image}>
        <motion.div className={styles.yx1ImageInner} style={{ x: imgX }} />
      </motion.div>
      <motion.div className={styles.yx1Info} style={{ x: infoX }}>
        <Reveal stagger={0.1}>
          <RevealItem as='h4'>YX1 EARPHONES</RevealItem>
          <RevealItem>
            <Button type='two' onClick={() => onSelect('yx1-earphones')}>See product</Button>
          </RevealItem>
        </Reveal>
      </motion.div>
    </motion.div>
  );
};

YX1Card.propTypes = {
  onSelect: PropTypes.func.isRequired,
  track: PropTypes.object,
  range: PropTypes.array.isRequired,
};

const HorizontalShowcase = ({ onSelect }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const { scrollYProgress: entry } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.0005 });
  const x = useTransform(progress, [0, 1], ['0%', `-${(PANELS - 1) * 100}%`]);
  const [active, setActive] = useState(1);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(PANELS, Math.round(v * (PANELS - 1)) + 1));
  });

  return (
    <section ref={ref} className={styles.showcase}>
      <div className={styles.sticky}>
        <motion.div className={styles.track} style={{ x }}>
          <div className={styles.panel}>
            <ZX9Card onSelect={onSelect} entry={entry} track={progress} />
          </div>
          <div className={styles.panel}>
            <ZX7Card onSelect={onSelect} track={progress} range={[0, 1]} />
          </div>
          <div className={styles.panel}>
            <YX1Card onSelect={onSelect} track={progress} range={[0.5, 1]} />
          </div>
        </motion.div>
        <div className={styles.hud}>
          <span className='overline'>Featured</span>
          <div className={styles.bar}>
            <motion.div className={styles.barFill} style={{ scaleX: progress }} />
          </div>
          <span className={styles.counter}>
            {String(active).padStart(2, '0')} <span>/ {String(PANELS).padStart(2, '0')}</span>
          </span>
        </div>
      </div>
    </section>
  );
};

HorizontalShowcase.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

const StackedShowcase = ({ onSelect }) => (
  <div className='container'>
    <div className={styles.stack}>
      <ZX9Card onSelect={onSelect} />
      <Reveal>
        <ZX7Card onSelect={onSelect} range={[0, 1]} />
      </Reveal>
      <Reveal>
        <YX1Card onSelect={onSelect} range={[0, 1]} />
      </Reveal>
    </div>
  </div>
);

StackedShowcase.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

const FeaturedShowcase = ({ onSelect }) => {
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const reduceMotion = useReducedMotion();

  return isDesktop && !reduceMotion
    ? <HorizontalShowcase onSelect={onSelect} />
    : <StackedShowcase onSelect={onSelect} />;
};

FeaturedShowcase.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default FeaturedShowcase;
