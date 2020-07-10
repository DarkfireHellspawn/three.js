/**
 * @author mrdoob / http://mrdoob.com/
 */

function WebGLAttributes(gl, capabilities)
{

	const isWebGL2 = capabilities.isWebGL2;

	const buffers = new WeakMap();

	function createBuffer(attribute, bufferType)
	{

		const array = attribute.array;
		const usage = attribute.usage;

		const buffer = gl.createBuffer();

		gl.bindBuffer(bufferType, buffer);
		gl.bufferData(bufferType, array, usage);

		attribute.onUploadCallback();

		let type = gl.FLOAT;

		if (array instanceof Float32Array)
		{

			type = gl.FLOAT;

		} else if (array instanceof Float64Array)
		{

			console.warn('THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.');

		} else if (array instanceof Uint16Array)
		{

			type = gl.UNSIGNED_SHORT;

		} else if (array instanceof Int16Array)
		{

			type = gl.SHORT;

		} else if (array instanceof Uint32Array)
		{

			type = gl.UNSIGNED_INT;

		} else if (array instanceof Int32Array)
		{

			type = gl.INT;

		} else if (array instanceof Int8Array)
		{

			type = gl.BYTE;

		} else if (array instanceof Uint8Array)
		{

			type = gl.UNSIGNED_BYTE;

		}

		return {
			buffer: buffer,
			type: type,
			bytesPerElement: array.BYTES_PER_ELEMENT,
			version: attribute.version
		};

	}

	function updateBuffer(buffer, attribute, bufferType)
	{

<<<<<<< HEAD
		var array = attribute.array;
		var updateRanges = attribute.updateRanges;
=======
		const array = attribute.array;
		const updateRange = attribute.updateRange;
>>>>>>> e2b7108b61ef17ac95b7e46a51c049ce8bf8a02e

		gl.bindBuffer(bufferType, buffer);

		if (updateRanges.size === 0)
		{

			// Not using update ranges

			gl.bufferSubData(bufferType, 0, array);

		} else
		{

			updateRanges.forEach((count, offset) =>
			{
				if (isWebGL2)
				{

					gl.bufferSubData(bufferType, offset * array.BYTES_PER_ELEMENT,
						array, offset, count);

				} else
				{

					gl.bufferSubData(bufferType, offset * array.BYTES_PER_ELEMENT,
						array.subarray(offset, offset + count));

				}
			});

			updateRanges.clear();

		}

	}

	//

	function get(attribute)
	{

		if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

		return buffers.get(attribute);

	}

	function remove(attribute)
	{

		if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

<<<<<<< HEAD
		var data = buffers.get(attribute);
=======
		const data = buffers.get( attribute );
>>>>>>> e2b7108b61ef17ac95b7e46a51c049ce8bf8a02e

		if (data)
		{

			gl.deleteBuffer(data.buffer);

			buffers.delete(attribute);

		}

	}

	function update(attribute, bufferType)
	{

		if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

<<<<<<< HEAD
		var data = buffers.get(attribute);
=======
		const data = buffers.get( attribute );
>>>>>>> e2b7108b61ef17ac95b7e46a51c049ce8bf8a02e

		if (data === undefined)
		{

			buffers.set(attribute, createBuffer(attribute, bufferType));

		} else if (data.version < attribute.version)
		{

			updateBuffer(data.buffer, attribute, bufferType);

			data.version = attribute.version;

		}

	}

	return {

		get: get,
		remove: remove,
		update: update

	};

}


export { WebGLAttributes };
