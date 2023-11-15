class AnimationControls {
    animationNames: string[] = [];
    selectedAnimation: string | undefined = undefined;
    autoplay = false;
    clipLength = 0;

    getAnimationName(): string | undefined {
        return this.selectedAnimation;
    }

    setAnimationName(newAnimation: string): void {
        this.selectedAnimation = newAnimation;
    }

}

const animationControls = new AnimationControls();
export default animationControls;