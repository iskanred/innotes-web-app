export class SignMethod {
	questionToChangeMethod: string;
	buttonText: string;
	title: string;

	constructor(signMethodQuestion: string, signMethodButtonText: string, signMethodTitle: string) {
		this.questionToChangeMethod = signMethodQuestion;
		this.buttonText = signMethodButtonText;
		this.title = signMethodTitle;
	}
}

/**
 * Singleton
 */
class SignInMethod extends SignMethod {
	private static _instance: SignInMethod;

	private constructor() {
		super("Already have an account?", "Sign In", "Log in");
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}
}

/**
 * Singleton
 */
class SignUpMethod extends SignMethod {
	private static _instance: SignUpMethod;

	private constructor() {
		super("Not have account yet?", "Sign Up", "Who are you?");
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}
}

export const signInMethod = SignInMethod.Instance;
export const signUpMethod = SignUpMethod.Instance;
