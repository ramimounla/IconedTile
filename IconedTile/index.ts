import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class IconedTile implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		// Add control initialization code
		//TODO conditional only if there are values in the div
		container.appendChild(this.createTile(context.parameters.colour1.raw || "",  context.parameters.title1.raw || "", context.parameters.tabName1.raw || "", context.parameters.icon1.raw || "" ));

		let input2 = context.parameters.title2.raw || "";
		if (input2.trim().length > 0)
			container.appendChild(this.createTile(context.parameters.colour2.raw || "",  input2, context.parameters.tabName2.raw || "", context.parameters.icon2.raw || ""));

		let input3 = context.parameters.title3.raw || "";
		if (input3.trim().length > 0)
			container.appendChild(this.createTile(context.parameters.colour3.raw || "",  input3, context.parameters.tabName3.raw || "", context.parameters.icon3.raw || ""));
	}

	private createTile(backgroundColor: string, title: string, tabName: string, imageUrl: string): HTMLDivElement {
		let localDiv: HTMLDivElement;
		localDiv = document.createElement("div");
		localDiv.className = "divstyle divother";
		localDiv.style.backgroundColor = backgroundColor;

		let spanDescription = document.createElement("span");
		spanDescription.className = "descriptionstyle";
		spanDescription.innerText = title;
		localDiv.appendChild(spanDescription);

		let image = document.createElement("img");
		image.className = 'imagespan';
		image.src = imageUrl;
		localDiv.appendChild(image);

		if (((tabName).trim().length > 0)) {
			localDiv.style.cursor = "pointer";
			localDiv.onclick = ((e: MouseEvent) => this.navigateToTab(tabName));
		}

		return localDiv;
	}


	private navigateToTab(tabName: string): void {
		eval("Xrm.Page.ui.tabs.get(tabName).setFocus()");
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}